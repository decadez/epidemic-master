package peris.decadez.epidemicbackend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peris.decadez.epidemicbackend.entity.Notice;
import peris.decadez.epidemicbackend.mapper.NoticeMapper;
import peris.decadez.epidemicbackend.service.NoticeService;

import java.util.List;

@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice> implements NoticeService {
  Logger logger = LoggerFactory.getLogger(NoticeServiceImpl.class);

  @Autowired
  NoticeMapper noticeMapper;

  @Override
  public List<Notice> getNoticeList() {
    return noticeMapper.selectList(null);
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
