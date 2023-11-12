package peris.decadez.epidemicbackend.service;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import peris.decadez.epidemicbackend.controller.ResponseData;
import peris.decadez.epidemicbackend.entity.Notice;

@Service
public class NoticePushService {

    private final SimpMessageSendingOperations messageSendingOperations;

    public NoticePushService(SimpMessageSendingOperations messageSendingOperations) {
        this.messageSendingOperations = messageSendingOperations;
    }

    @Scheduled(fixedRate = 5000)
    @MessageMapping("/notice/chat")
    public void sendPushNotification(Notice notice) {
        messageSendingOperations.convertAndSend("/topic/notice", notice);
    }
}
