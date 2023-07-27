package peris.decadez.epidemicbackend.entity.Enum;

import com.baomidou.mybatisplus.annotation.EnumValue;

public enum NoticeStatus {
  CLOSE("CLOSE"), OPEN("OPEN");

  @EnumValue
  public final String status;

  NoticeStatus(String status) {
    this.status = status;
  }
}
