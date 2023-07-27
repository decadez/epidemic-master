package peris.decadez.epidemicbackend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import peris.decadez.epidemicbackend.entity.Notice;

import java.util.List;

public interface NoticeService extends IService<Notice> {
  public List<Notice> getNoticeList();

  public void updateNotice(Notice notice);

  public void deleteNotice(int id);

  public void createNotice(Notice notice);
}
