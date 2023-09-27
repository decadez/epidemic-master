package peris.decadez.epidemicbackend.entity.Enum;

import com.baomidou.mybatisplus.annotation.EnumValue;

public enum MessageNature {

    DOWN("DOWN"),UP("UP");

    @EnumValue
    public final String nature;

    MessageNature(String nature) {
        this.nature = nature;
    }
}
