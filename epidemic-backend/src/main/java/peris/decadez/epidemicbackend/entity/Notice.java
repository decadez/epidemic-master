package peris.decadez.epidemicbackend.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import peris.decadez.epidemicbackend.entity.Enum.NoticeStatus;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class Notice implements Serializable {
  @TableId(type = IdType.AUTO)
  private Long id;
  private Long userId;
  private String creator;
  private String title;
  private String imgUrl;
  @Lob
  @Column(name = "content", columnDefinition = "longtext")
  private String content;
  private NoticeStatus status;
  @TableField(fill = FieldFill.INSERT)
  private Timestamp createAt;
  @TableField(fill = FieldFill.UPDATE)
  private Timestamp editAt;
}
