package peris.decadez.epidemicbackend.controller.mobile;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import peris.decadez.epidemicbackend.annotation.PassToken;
import peris.decadez.epidemicbackend.annotation.UserLoginToken;
import peris.decadez.epidemicbackend.controller.ResponseData;
import peris.decadez.epidemicbackend.entity.Enum.MessageLeaveEnum;
import peris.decadez.epidemicbackend.entity.Enum.NatureOfSpeehEnum;
import peris.decadez.epidemicbackend.entity.MessageLeave;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.service.GPTService;
import peris.decadez.epidemicbackend.service.MessageLeaveService;
import peris.decadez.epidemicbackend.service.UserService;
import peris.decadez.epidemicbackend.utils.TokenUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Validated
@RestController
@UserLoginToken
@RequestMapping("/mobile/leaveMessage")
public class MessageLeaveMobileController {
    @Autowired
    MessageLeaveService messageLeaveService;

    @Autowired
    ThreadPoolTaskExecutor taskExecutor;

    @Autowired
    UserService useService;

    @PostMapping("/create")
    public ResponseData<?> createMessageLeave(@RequestBody Map<String, String> params) {
        MessageLeave messageLeave = new MessageLeave();
        Long userId = Long.valueOf(TokenUtil.getTokenUserId());
        User user = useService.findUserById(userId);

        if (params.get("title") != null) {
            messageLeave.setTitle(params.get("title"));
        }

        if (params.get("content") != null) {
            messageLeave.setContent(params.get("content"));
        }

        messageLeave.setCreator(user.getUsername());
        messageLeave.setStatus(MessageLeaveEnum.NULL);
        messageLeave.setNatureOfSpeech(NatureOfSpeehEnum.WAITING);
        messageLeaveService.save(messageLeave);

        if (params.get("title") != null) {
            taskExecutor.execute(() -> {
                JsonObject jsonObject = null;
                jsonObject = GPTService.aiTask(String.format("请帮我分析以下内容是贬义还是褒义，`%s`，必须回答BAD 或者 GOOD", params.get("title")));
                JsonObject output = null;
                if (jsonObject != null) {
                    output = jsonObject.getAsJsonObject("output");
                }
                if (output != null && output.isJsonObject()) {
                    JsonElement text = output.get("text");
                    String patternString = "BAD";
                    Pattern pattern = Pattern.compile(patternString);
                    Matcher matcher = pattern.matcher(text.getAsString());
                    messageLeave.setNatureOfSpeech(matcher.find() ? NatureOfSpeehEnum.BAD : NatureOfSpeehEnum.GOOD);
                    messageLeaveService.updateById(messageLeave);
                }
            });
        }

        return ResponseData.of(200, true, true);
    }

    @GetMapping("/commonList")
    @PassToken
    public ResponseData<?> getCommonList(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                         @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
                                         @RequestParam(value = "title", defaultValue = "") String title,
                                         @RequestParam(value = "start", defaultValue = "") String start,
                                         @RequestParam(value = "end", defaultValue = "") String end,
                                         @RequestParam(value = "status[]", defaultValue = "") String[] status,
                                         @RequestParam(value = "natureOfSpeech[]", defaultValue = "") String[] natureOfSpeech,
                                         @RequestParam(value = "creators[]", defaultValue = "") Integer[] creators,
                                         @RequestParam(value = "isOwnSelf", defaultValue = "false") Boolean isOwnSelf
    ) {
        Map<String, Object> params = new HashMap<>();
        params.put("page", page);
        params.put("pageSize", pageSize);
        params.put("isOwnSelf", isOwnSelf);

        if (creators.length != 0) {
            params.put("creators", creators);
        }

        if (status.length != 0) {
            params.put("status", status);
        }
        if (natureOfSpeech.length != 0) {
            params.put("natureOfSpeech", natureOfSpeech);
        }

        if (!title.isEmpty()) {
            params.put("title", title);
        }

        if (!start.isEmpty() && !end.isEmpty()) {
            params.put("start", start);
            params.put("end", end);
        }

        Map<String, Object> messageMap = messageLeaveService.getMessageLeaveList(params);

        if (messageMap == null) {
            return ResponseData.of(200, true, null);
        }

        return ResponseData.of(200, true, messageMap);
    }
}
