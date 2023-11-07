package peris.decadez.epidemicbackend.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import peris.decadez.epidemicbackend.entity.Enum.GenderEnum;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class User implements Serializable {
  @TableId(type = IdType.AUTO)
  private Long id;
  private String name;
  private String username;
  private Integer age;
  private GenderEnum sex;
  private String email;
  private String idCard;
  private String phone;
  private String address;
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String password;
  @TableField(fill = FieldFill.INSERT)
  private Timestamp createAt;
  @TableField(fill = FieldFill.UPDATE)
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private Timestamp editAt;
}