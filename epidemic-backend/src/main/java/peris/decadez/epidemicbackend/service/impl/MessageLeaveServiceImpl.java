package peris.decadez.epidemicbackend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peris.decadez.epidemicbackend.entity.MessageLeave;
import peris.decadez.epidemicbackend.entity.Notice;
import peris.decadez.epidemicbackend.mapper.MessageLeaveMapper;
import peris.decadez.epidemicbackend.service.MessageLeaveService;

import java.util.List;

@Service
public class MessageLeaveServiceImpl extends ServiceImpl<MessageLeaveMapper, MessageLeave> implements MessageLeaveService {

    @Autowired
    MessageLeaveMapper messageLeaveMapper;
    @Override
    public List<MessageLeave> getMessageLeaveList() {
        return null;
    }

    @Override
    public void updateMessageLeave(MessageLeave messageList) {

    }

    @Override
    public void deleteMessageLeave(int id) {

    }

    @Override
    public int createMessageLeave(MessageLeave messageLeave) {return messageLeaveMapper.insert(messageLeave);}

    @Override
    public boolean saveOrUpdate(MessageLeave entity) {
        return false;
    }

}
