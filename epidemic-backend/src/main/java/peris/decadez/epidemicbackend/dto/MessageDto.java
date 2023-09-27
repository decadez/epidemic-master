package peris.decadez.epidemicbackend.dto;


import jakarta.persistence.Transient;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.sql.Timestamp;
// 在此层进行参数验证,不直接将请求体参数传递到Service层

@Data

public class MessageDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    @Transient
    @Min(value = 1, message = "当前页数不能小于1")
    @Max(value = 250, message = "每页条数不能大于250")
    private Integer title;


    @Transient
    @Min(value = 1, message = "每页条数不能小于1")
    @Max(value = 250, message = "每页条数不能大于250")
    private Integer content;

    @Transient
    private Timestamp createAt;
}