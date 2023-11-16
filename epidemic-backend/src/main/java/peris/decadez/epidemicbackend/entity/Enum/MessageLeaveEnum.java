package peris.decadez.epidemicbackend.entity.Enum;

import com.baomidou.mybatisplus.annotation.EnumValue;

public enum MessageLeaveEnum {
  // REPLIED: 已回复, NULL: 未回复
  REPLIED("REPLIED"), NULL("NULL");

  @EnumValue
  public final String status;

  MessageLeaveEnum(String status) {
    this.status = status;
  }
}