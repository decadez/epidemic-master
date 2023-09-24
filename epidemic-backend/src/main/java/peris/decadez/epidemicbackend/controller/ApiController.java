package peris.decadez.epidemicbackend.controller;

import cn.hutool.json.JSONObject;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import peris.decadez.epidemicbackend.entity.Enum.GenderEnum;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.service.TokenService;
import peris.decadez.epidemicbackend.service.UserService;
import peris.decadez.epidemicbackend.service.impl.UserServiceImpl;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {
  @Autowired
  private UserService userService;

  @Autowired
  private TokenService tokenService;

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
      return new ResponseData<>(200, "success", jsonObject);
    }
    return new ResponseData<>(401, "failed", false);
  }

  public static class RegistrationRequest {
    public String username;
    public String name;
    public String email;
    public String password;
    public String phone;
  }
}
