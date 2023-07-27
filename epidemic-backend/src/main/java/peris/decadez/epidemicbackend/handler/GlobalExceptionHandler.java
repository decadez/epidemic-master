package peris.decadez.epidemicbackend.handler;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import peris.decadez.epidemicbackend.controller.ResponseData;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler({ CustomException.class })
  public ResponseData<String> customExceptionHandler(Exception e) {
    return new ResponseData<>(500, e.getMessage(), null);
  }

  private class CustomException extends Exception {
  }
}
