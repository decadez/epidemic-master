package peris.decadez.epidemicbackend.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import peris.decadez.epidemicbackend.entity.Enum.NoticeStatus;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class Notice implements Serializable {
  @TableId(type = IdType.AUTO)
  private Long id;
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private Long userId;
  private String title;
  private String imgUrl;
  private String content;
  private NoticeStatus status;
  @TableField(fill = FieldFill.INSERT)
  private Timestamp createAt;
  @TableField(fill = FieldFill.UPDATE)
  private Timestamp editAt;
}
