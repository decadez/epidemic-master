package peris.decadez.epidemicbackend.entity.Enum;

import com.baomidou.mybatisplus.annotation.EnumValue;

public enum GenderEnum {
  // MALE: 男性, FEMALE: 女性
  MALE("MALE"), FEMALE("FEMALE");

  @EnumValue
  public final String gender;

  GenderEnum(String gender) {
    this.gender = gender;
  }
}