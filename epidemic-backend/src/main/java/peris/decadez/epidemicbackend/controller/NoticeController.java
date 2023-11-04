package peris.decadez.epidemicbackend.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import peris.decadez.epidemicbackend.annotation.UserLoginToken;
import peris.decadez.epidemicbackend.entity.Notice;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.service.NoticeService;
import peris.decadez.epidemicbackend.utils.TokenUtil;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    NoticeService noticeService;

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
    public ResponseData<?> getNoticeList() {
        Long userId = Long.valueOf(TokenUtil.getTokenUserId());
        if (userId == null) {
            return ResponseData.of(401, false, "请先登录");
        }
        List<Notice> notices = noticeService.getNoticeListByUserId(userId);
        return ResponseData.of(200, true, notices);
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
