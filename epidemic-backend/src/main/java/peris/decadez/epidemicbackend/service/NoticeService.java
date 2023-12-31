package peris.decadez.epidemicbackend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import peris.decadez.epidemicbackend.entity.Notice;
import peris.decadez.epidemicbackend.entity.User;

import java.util.List;
import java.util.Map;

public interface NoticeService extends IService<Notice> {
  public Map<String, Object> getNoticeList(Map<String, Object> params);


  public void updateNotice(Notice notice);

  public void deleteNotice(int id);

  public void createNotice(Notice notice);
}
