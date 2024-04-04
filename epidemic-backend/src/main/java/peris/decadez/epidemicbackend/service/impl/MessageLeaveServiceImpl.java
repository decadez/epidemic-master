package peris.decadez.epidemicbackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peris.decadez.epidemicbackend.entity.Enum.MessageLeaveEnum;
import peris.decadez.epidemicbackend.entity.Enum.NatureOfSpeehEnum;
import peris.decadez.epidemicbackend.entity.MessageLeave;
import peris.decadez.epidemicbackend.mapper.MessageLeaveMapper;
import peris.decadez.epidemicbackend.service.MessageLeaveService;
import peris.decadez.epidemicbackend.utils.TokenUtil;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import peris.decadez.epidemicbackend.utils.CommonUtils;

@Service
public class MessageLeaveServiceImpl extends ServiceImpl<MessageLeaveMapper, MessageLeave> implements MessageLeaveService {

    @Autowired
    MessageLeaveMapper messageLeaveMapper;

    @Override
    public Map<String, Object> getMessageLeaveList(Map<String, Object> params) {
        IPage<MessageLeave> pagination = new Page<>(Long.parseLong(params.get("page").toString()), Long.parseLong(params.get("pageSize").toString()));
        QueryWrapper<MessageLeave> wrapper = new QueryWrapper<>();
        wrapper.orderBy(true, false, "status", "create_at");

        boolean isOwnSelf = Boolean.parseBoolean(params.get("isOwnSelf").toString());
        if (isOwnSelf) {
            Long userId = Long.valueOf(TokenUtil.getTokenUserId());
            wrapper.eq("user_id", userId);
        }

        if (params.get("creators") != null && !isOwnSelf) {
            Integer[] creators = (Integer[]) params.get("creators");
            wrapper.in("user_id", creators);
        }

        if (params.get("natureOfSpeech") != null) {
            String[] natureOfSpeechArray = (String[]) params.get("natureOfSpeech");
            NatureOfSpeehEnum[] enumArray = CommonUtils.parseStringArray(natureOfSpeechArray, NatureOfSpeehEnum.class);
            wrapper.in("nature_of_speech", enumArray);
        }

        if (params.get("status") != null) {
            String[] statusArray = (String[]) params.get("status");
            MessageLeaveEnum[] enumArray = CommonUtils.parseStringArray(statusArray, MessageLeaveEnum.class);
            wrapper.in("status", enumArray);
        }

        if (params.get("title") != null) {
            wrapper.like("title", params.get("title").toString());
        }

        if (params.get("start") != null && params.get("end") != null) {
            wrapper.between("create_at", params.get("start").toString(), params.get("end").toString());
        }

        messageLeaveMapper.selectPage(pagination, wrapper);
        List<MessageLeave> messageLeaveList = pagination.getRecords();
        Map<String, Object> messageLeaveMap = new HashMap<>();

        long total = pagination.getTotal();
        messageLeaveMap.put("list", messageLeaveList);
        messageLeaveMap.put("total", total);

        if (!messageLeaveList.isEmpty()) {
            return messageLeaveMap;
        }
        return null;
    }

    @Override
    public void updateMessageLeave(MessageLeave messageList) {

    }

    @Override
    public void deleteMessageLeave(int id) {

    }

    @Override
    public int createMessageLeave(MessageLeave messageLeave) {
        return messageLeaveMapper.insert(messageLeave);
    }

    @Override
    public boolean saveOrUpdate(MessageLeave entity) {
        return false;
    }

}
