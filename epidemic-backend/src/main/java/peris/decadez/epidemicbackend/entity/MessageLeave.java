package peris.decadez.epidemicbackend.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Data;
import peris.decadez.epidemicbackend.entity.Enum.MessageLeaveEnum;
import peris.decadez.epidemicbackend.entity.Enum.MessageNature;
import peris.decadez.epidemicbackend.entity.Enum.NatureOfSpeehEnum;
import peris.decadez.epidemicbackend.entity.Enum.NoticeStatus;

import java.io.Serializable;
import java.sql.Timestamp;


@Data
public class MessageLeave implements Serializable {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String creator;
    private String title;
    @Lob
    @Column(name = "content", columnDefinition = "longtext")
    private String content;
    @Lob
    @Column(name = "messages", columnDefinition = "longtext")
    private String messages;
    private MessageLeaveEnum status;
    private NatureOfSpeehEnum natureOfSpeech;
    @TableField(fill = FieldFill.INSERT)
    private Timestamp createAt;
    @TableField(fill = FieldFill.UPDATE)
    private Timestamp editAt;
}
