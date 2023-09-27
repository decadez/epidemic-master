package peris.decadez.epidemicbackend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import peris.decadez.epidemicbackend.entity.MessageLeave;

import java.util.List;


public interface MessageLeaveService extends IService<MessageLeave> {
    List<MessageLeave> getMessageLeaveList();

    void updateMessageLeave(MessageLeave messageList);

    void deleteMessageLeave(int id);

    int createMessageLeave(MessageLeave messageList);
}