package peris.decadez.epidemicbackend.handler;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.ValidationException;
import org.springframework.boot.context.properties.bind.validation.BindValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import peris.decadez.epidemicbackend.controller.ResponseData;

import java.util.Objects;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ResponseEntity<?> error(MethodArgumentNotValidException err) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
              .body(ResponseData.of(HttpStatus.BAD_REQUEST.value(), false, null, err.getMessage()));
  }

  @ExceptionHandler(value = Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<?> error(Exception err) {
    return ResponseEntity.ok(ResponseData.of(HttpStatus.INTERNAL_SERVER_ERROR.value(),  false, null, err.getMessage()));
  }

  @ExceptionHandler(value = ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ResponseEntity<?> error(ConstraintViolationException err) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ResponseData.of(HttpStatus.BAD_REQUEST.value(), false,null, err.getMessage()));
  }
}
