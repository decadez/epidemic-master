package peris.decadez.epidemicbackend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import peris.decadez.epidemicbackend.entity.Enum.NoticeStatus;

import java.sql.Timestamp;

@Data
public class Notice {
  @TableId(type = IdType.AUTO)
  private Long id;
  private String title;
  private String imgUrl;
  private String content;
  private NoticeStatus status;
  private String creator;
  private Timestamp createAt;
  private Timestamp editAt;
}
