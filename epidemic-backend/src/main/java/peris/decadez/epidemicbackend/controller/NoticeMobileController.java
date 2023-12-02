package peris.decadez.epidemicbackend.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import peris.decadez.epidemicbackend.annotation.PassToken;
import peris.decadez.epidemicbackend.annotation.UserLoginToken;
import peris.decadez.epidemicbackend.entity.Enum.NoticeStatus;
import peris.decadez.epidemicbackend.entity.Notice;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.service.NoticePushService;
import peris.decadez.epidemicbackend.service.NoticeService;
import peris.decadez.epidemicbackend.service.UserService;
import peris.decadez.epidemicbackend.utils.TokenUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mobile/notice")
public class NoticeMobileController {
    @Autowired
    NoticeService noticeService;

    @Autowired
    UserService useService;

    @Autowired
    private final NoticePushService noticePushService;

    public NoticeMobileController(NoticePushService noticePushService) {
        this.noticePushService = noticePushService;
    }

    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;

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

        Map<String, Object> noticeMap = noticeService.getNoticeList(params);

        if (noticeMap == null) {
            return ResponseData.of(200, true, null);
        }

        return ResponseData.of(200, true, noticeMap);
    }

    @GetMapping("/commonList")
    @PassToken
    public ResponseData<?> getNoticeForUser(
            @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize,
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "isOwnSelf", defaultValue = "false") Boolean isOwnSelf,
            @RequestParam(value = "status[]", defaultValue = "OPEN") String[] status
    ) {
        Map<String, Object> params = new HashMap<>();
        params.put("pageSize", pageSize);
        params.put("page", page);
        params.put("isOwnSelf", isOwnSelf);

        if (status.length != 0) {
            params.put("status", status);
        }

        Map<String, Object> noticeMap = noticeService.getNoticeList(params);

        if (noticeMap == null) {
            return ResponseData.of(200, true, null);
        }

        List<Notice> notices = (List<Notice>) noticeMap.get("list");
        List<Notice> curNoticeList = notices.stream()
                .map(item -> {
                    Notice notice = new Notice();
                    notice.setTitle(String.valueOf(item.getTitle()));
                    notice.setImgUrl(String.valueOf(item.getImgUrl()));
                    notice.setContent(String.valueOf(item.getContent()));
                    notice.setId(item.getId());
                    return notice;
                }).collect(Collectors.toList());

        return ResponseData.of(200, true, curNoticeList);
    }
}
