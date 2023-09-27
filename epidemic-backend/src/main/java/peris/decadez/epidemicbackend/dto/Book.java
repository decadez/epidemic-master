package peris.decadez.epidemicbackend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.io.Serializable;

@Data
public class Book implements Serializable {

    @NotBlank(message = "{book.name}")
    private String name;

}
