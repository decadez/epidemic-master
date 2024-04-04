package peris.decadez.epidemicbackend.utils;

import java.lang.reflect.Array;

public class CommonUtils {
    public static <T extends Enum<T>> T[] parseStringArray(String[] strings, Class<T> enumType) {
        try {
            T[] enumConstants = enumType.getEnumConstants();
            T[] result = (T[]) Array.newInstance(enumType, strings.length);
            for (int i = 0; i < strings.length; i++) {
                for (int j = 0; j < enumConstants.length; j++) {
                    if (enumConstants[j].name().equals(strings[i])) {
                        result[i] = enumConstants[j];
                        break;
                    }
                }
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
