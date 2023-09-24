package peris.decadez.epidemicbackend.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import peris.decadez.epidemicbackend.controller.ResponseData;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(value = Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<?> error(Exception err) {
    return ResponseEntity.ok(ResponseData.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), err.getMessage(), "{}"));
  }

  @ExceptionHandler({ CustomException.class })
  public ResponseData<String> customExceptionHandler(Exception e) {
    return new ResponseData<>(500, e.getMessage(), null);
  }

  private class CustomException extends Exception {
  }
}
