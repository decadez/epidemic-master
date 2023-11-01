package peris.decadez.epidemicbackend.controller;

import lombok.Data;

@Data
public class ResponseData<T> {
  private int code;
  private boolean success;
  private T data;
  private String errorMessage;


  public ResponseData(int code, boolean success, T data) {
    this.code = code;
    this.success = success;
    this.data = data;
  }

  public ResponseData(int code, boolean success, T data, String errorMessage) {
    this.code = code;
    this.success = success;
    this.data = data;
    this.errorMessage = errorMessage;
  }

  public static ResponseData<?> of(final int code, final boolean success, final Object data) {
    return new ResponseData<>(code, success, data);
  }
}
