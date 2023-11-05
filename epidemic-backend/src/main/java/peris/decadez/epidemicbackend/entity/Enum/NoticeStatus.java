package peris.decadez.epidemicbackend.entity.Enum;

import com.baomidou.mybatisplus.annotation.EnumValue;

public enum NoticeStatus {
  // CLOSE: 关闭，OPEN: 开启，NULL: 未知状态
  CLOSE("CLOSE"), OPEN("OPEN"), NULL("NULL");

  @EnumValue
  public final String status;

  NoticeStatus(String status) {
    this.status = status;
  }
}
