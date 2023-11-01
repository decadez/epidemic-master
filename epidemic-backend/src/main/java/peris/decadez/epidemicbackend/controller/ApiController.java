package peris.decadez.epidemicbackend.controller;

import cn.hutool.json.JSONObject;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import peris.decadez.epidemicbackend.dto.Book;
import peris.decadez.epidemicbackend.entity.Enum.GenderEnum;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.service.MessageLeaveService;
import peris.decadez.epidemicbackend.service.TokenService;
import peris.decadez.epidemicbackend.service.UserService;

import java.util.Map;

@Validated
@RestController
@RequestMapping("/api")
public class ApiController {
  @Autowired
  private UserService userService;

  @Autowired
  private TokenService tokenService;

  @Autowired
  private MessageLeaveService messageLeaveService;

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegistrationRequest registrationRequest) {
    // 检查用户名是否唯一
    if (!userService.listByMap(Map.of("username", registrationRequest.username)).isEmpty()) {
      return new ResponseEntity<>("The username already exists.", HttpStatus.CONFLICT);
    }

    // 检查email是否唯一
    if (!userService.listByMap(Map.of("email", registrationRequest.email)).isEmpty()) {
      return new ResponseEntity<>("The username already exists.", HttpStatus.CONFLICT);
    }

    // 创建新用户并保存到数据库中
    User user = new User();
    user.setUsername(registrationRequest.username);
    user.setPassword(registrationRequest.password);
    user.setEmail(registrationRequest.email);
    user.setEmail(registrationRequest.email);
    user.setName("defaultName");
    user.setAge(18);
    user.setSex(GenderEnum.FEMALE);

    userService.save(user);
    return new ResponseEntity<>("User registered successfully.", HttpStatus.OK);
  }

  @GetMapping("/login")
  public ResponseData<?> login(User user, HttpServletResponse response) {
    User currentUser = new User();
    currentUser.setUsername(user.getUsername());
    currentUser.setEmail(user.getEmail());
    currentUser.setPassword(user.getPassword());
    JSONObject jsonObject = new JSONObject();

    User loginUser = userService.login(currentUser);
    if (loginUser != null) {
      String token = tokenService.getToken(loginUser);
      jsonObject.put("token", token);
      Cookie cookie = new Cookie("token", token);
      cookie.setPath("/");
      response.addCookie(cookie);
      return new ResponseData<>(200, true, jsonObject);
    }
    return new ResponseData<>(401, false, false);
  }

  @PostMapping(value = "/nn")
  public ResponseEntity<?> n(@RequestBody @Validated Book b) {
    return ResponseEntity.ok(b);
  }

  @GetMapping(value = "/nn")
  public ResponseEntity<?> n(@RequestParam(value = "name")
                               @NotBlank(message = "{book.name}") final String name) {
    return ResponseEntity.ok(name);
  }

  public static class RegistrationRequest {
    public String username;
    public String name;
    public String email;
    public String password;
    public String phone;
  }
//  @PostMapping("/message/create")
//  public ResponseEntity<String> createMessage(@RequestBody @Validated MessageDto messageDto){
//    //将留言信息保存到数据库中
//    messageDto
//
//    if (messageLeave == null || messageLeave.getContent() == null || messageLeave.getTitle() == null) {
//      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }
//    // 调用Service层方法，实现事务控制和真正的数据处理逻辑
//    messageLeaveService.createMessageLeave(messageDto);
//    return new ResponseEntity<>(HttpStatus.OK);
//  }


//  @Data
//  public class CreateOrderDTO {
//
//    @NotNull(message = "订单号不能为空")
//    private String orderId;
//    @NotNull(message = "订单金额不能为空")
//    @Min(value = 1, message = "订单金额不能小于0")
//    private Integer amount;
//    @Pattern(regexp = "^1[3|4|5|7|8][0-9]{9}$", message = "用户手机号不合法")
//    private String mobileNo;
//    private String orderType;
//    private String status;
//  }



}







