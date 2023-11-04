package peris.decadez.epidemicbackend.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import peris.decadez.epidemicbackend.entity.Enum.NoticeStatus;

import java.io.Serializable;
import java.sql.Timestamp;


@Data
public class Health implements Serializable {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private double temperature;
    private String symptoms;
    private byte hasContactHistory;
    private String ContactHistory;
    @TableField(fill = FieldFill.INSERT)
    private Timestamp createAt;
    @TableField(fill = FieldFill.UPDATE)
    private Timestamp editAt;
}
