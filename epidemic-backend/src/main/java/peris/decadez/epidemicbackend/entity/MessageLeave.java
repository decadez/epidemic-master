package peris.decadez.epidemicbackend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import peris.decadez.epidemicbackend.entity.Enum.MessageNature;

import java.io.Serializable;
import java.sql.Timestamp;


@Data
public class MessageLeave implements Serializable {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String title;
    private Long user_id ;
    private MessageNature nature;
    private String content;
    private byte hasContactHistory;
    private Timestamp createAt;

}
