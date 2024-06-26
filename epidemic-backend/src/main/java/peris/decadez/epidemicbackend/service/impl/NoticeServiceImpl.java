package peris.decadez.epidemicbackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peris.decadez.epidemicbackend.entity.Enum.NoticeStatus;
import peris.decadez.epidemicbackend.entity.Notice;
import peris.decadez.epidemicbackend.mapper.NoticeMapper;
import peris.decadez.epidemicbackend.service.NoticeService;
import peris.decadez.epidemicbackend.utils.TokenUtil;
import peris.decadez.epidemicbackend.utils.CommonUtils;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice> implements NoticeService {
  @Autowired
  NoticeMapper noticeMapper;

  @Override
  public Map<String, Object> getNoticeList(Map<String, Object> params) {
    IPage<Notice> pagination = new Page<>(Long.parseLong(params.get("page").toString()), Long.parseLong(params.get("pageSize").toString()));
    QueryWrapper<Notice> wrapper = new QueryWrapper<>();
    wrapper.orderBy(true, false, "status","create_at");

    boolean isOwnSelf = Boolean.parseBoolean(params.get("isOwnSelf").toString());
    if (isOwnSelf) {
      Long userId = Long.valueOf(TokenUtil.getTokenUserId());
      wrapper.eq("user_id",userId);
    }

    if (params.get("creators") != null && !isOwnSelf) {
      Integer[] creators = (Integer[]) params.get("creators");
      wrapper.in("user_id", creators);
    }

    if (params.get("status") != null) {
      String[] statusArray = (String[]) params.get("status");
      NoticeStatus[] enumArray = CommonUtils.parseStringArray(statusArray, NoticeStatus.class);
      wrapper.in("status", enumArray);
    }

    if (params.get("title")!= null) {
      wrapper.like("title", params.get("title").toString());
    }

    if (params.get("start")!= null && params.get("end")!= null) {
      wrapper.between("create_at", params.get("start").toString(), params.get("end").toString());
    }

    noticeMapper.selectPage(pagination, wrapper);
    List<Notice> noticeList = pagination.getRecords();
    Map<String, Object> noticeMap = new HashMap<>();

    long total = pagination.getTotal();
    noticeMap.put("list", noticeList);
    noticeMap.put("total", total);

    if (!noticeList.isEmpty()) {
      return noticeMap;
    }
    return null;
  }


  @Override
  public void updateNotice(Notice notice) {
    noticeMapper.updateById(notice);
  }

  @Override
  public void deleteNotice(int id) {
    noticeMapper.deleteById(id);
  }

  @Override
  public void createNotice(Notice notice) {
    noticeMapper.insert(notice);
  }
}
