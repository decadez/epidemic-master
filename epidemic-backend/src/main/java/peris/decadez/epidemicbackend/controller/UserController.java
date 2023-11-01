package peris.decadez.epidemicbackend.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import peris.decadez.epidemicbackend.annotation.UserLoginToken;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.service.TokenService;
import peris.decadez.epidemicbackend.service.impl.UserServiceImpl;
import peris.decadez.epidemicbackend.utils.TokenUtil;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  private UserServiceImpl userServiceImpl;

  @Autowired
  private TokenService tokenService;

  @UserLoginToken
  @PostMapping("/edit")
  public ResponseData<?> edit(@RequestBody User user, HttpServletResponse response) {
    Long userId = Long.valueOf(TokenUtil.getTokenUserId());
    user.setId(userId);
    userServiceImpl.updateById(user);
    return new ResponseData<>(200, true, true);
  }

  @UserLoginToken
  @GetMapping("/info")
  public ResponseData<?> info(HttpServletResponse response) {
    Long userId = Long.valueOf(TokenUtil.getTokenUserId());
    return new ResponseData<>(200, true, userServiceImpl.findUserById(userId));
  }
}
