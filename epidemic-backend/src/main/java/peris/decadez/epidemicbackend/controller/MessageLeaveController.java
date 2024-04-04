package peris.decadez.epidemicbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import peris.decadez.epidemicbackend.annotation.UserLoginToken;
import peris.decadez.epidemicbackend.service.MessageLeaveService;

import java.util.HashMap;
import java.util.Map;

@Validated
@RestController
@UserLoginToken
@RequestMapping("/webapi/leaveMessage")
public class MessageLeaveController {
    @Autowired
    MessageLeaveService messageLeaveService;

    @UserLoginToken
    @GetMapping("/list")
    public ResponseData<?> getNoticeList(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                         @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
                                         @RequestParam(value = "title", defaultValue = "") String title,
                                         @RequestParam(value = "start", defaultValue = "") String start,
                                         @RequestParam(value = "end", defaultValue = "") String end,
                                         @RequestParam(value = "status[]", defaultValue = "") String[] status,
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
