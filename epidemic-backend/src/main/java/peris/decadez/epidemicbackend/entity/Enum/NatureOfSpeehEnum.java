package peris.decadez.epidemicbackend.entity.Enum;

import com.baomidou.mybatisplus.annotation.EnumValue;

public enum NatureOfSpeehEnum {
    // WAITING: 已回复, GOOD: 褒义, BAD: 贬义
    WAITING("WAITING"), GOOD("GOD"), BAD("BAD");

    @EnumValue
    public final String natureOfSpeech;

    NatureOfSpeehEnum(String natureOfSpeech) {
        this.natureOfSpeech = natureOfSpeech;
    }
}
