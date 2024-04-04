package peris.decadez.epidemicbackend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import peris.decadez.epidemicbackend.entity.MessageLeave;

import java.util.List;
import java.util.Map;


public interface MessageLeaveService extends IService<MessageLeave> {

    Map<String, Object> getMessageLeaveList(Map<String, Object> params);

    void updateMessageLeave(MessageLeave messageList);

    void deleteMessageLeave(int id);

    int createMessageLeave(MessageLeave messageList);
}