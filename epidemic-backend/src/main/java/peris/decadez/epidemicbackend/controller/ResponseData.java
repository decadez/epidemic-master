package peris.decadez.epidemicbackend.controller;

import lombok.Data;
import lombok.Getter;

@Data
public class ResponseData<T> {
  private int code;
  private String message;
  private T data;

  public ResponseData(int code, String message, T data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  public static ResponseData<?> of(final int coe, final String message, final Object n) {
    return new ResponseData<>(coe, message, n);
  }

}
