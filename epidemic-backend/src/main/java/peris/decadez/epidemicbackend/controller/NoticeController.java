package peris.decadez.epidemicbackend.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import peris.decadez.epidemicbackend.annotation.UserLoginToken;
import peris.decadez.epidemicbackend.entity.Enum.NoticeStatus;
import peris.decadez.epidemicbackend.entity.Notice;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.service.NoticeService;
import peris.decadez.epidemicbackend.service.UserService;
import peris.decadez.epidemicbackend.utils.TokenUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    NoticeService noticeService;

    @Autowired
    UserService useService;

    // @MessageMapping和@RequestMapping功能类似，用于设置URL映射地址，浏览器向服务器发起请求，需要通过该地址。
    // 如果服务器接受到了消息，就会对订阅了@SendTo括号中的地址传送消息。
    @MessageMapping("/notice/chat")
    // 订阅地址
    @SendTo("/topic/notice")
    public Notice getNotice(Notice notice){
        return notice;
    }

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
        Long userId = Long.valueOf(TokenUtil.getTokenUserId());

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

        Map<String, Object> noticeMap = noticeService.getNoticeList(params);
        return ResponseData.of(200, true, noticeMap);
    }

    @UserLoginToken
    @PostMapping("/create")
    public ResponseData<?> createNotice(@RequestBody Notice notice, HttpServletResponse response) {
        Long userId = Long.valueOf(TokenUtil.getTokenUserId());
        User user = useService.findUserById(userId);
        notice.setCreator(user.getName());
        notice.setUserId(user.getId());
        notice.setStatus(NoticeStatus.NULL);
        noticeService.save(notice);
        return ResponseData.of(200, true, true);
    }

    @UserLoginToken
    @GetMapping("/delete")
    public ResponseData<?> deleteNotice(@RequestParam(value = "id", defaultValue = "") Integer noticeId) {
        noticeService.deleteNotice(noticeId);
        return ResponseData.of(200, true, true);
    }

    @UserLoginToken
    @PostMapping("/send")
    public ResponseData<?> sendNotice(@RequestBody Notice notice, HttpServletResponse response) {
        Long userId = Long.valueOf(TokenUtil.getTokenUserId());
        return ResponseData.of(200, true, true);
    }

    @UserLoginToken
    @PostMapping("/edit")
    public ResponseData<?> editNotice(@RequestBody Notice notice, HttpServletResponse response) {
        return ResponseData.of(200, true, true);
    }
}
