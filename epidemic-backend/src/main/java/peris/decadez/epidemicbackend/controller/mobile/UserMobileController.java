package peris.decadez.epidemicbackend.controller.mobile;

import cn.hutool.json.JSONObject;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import peris.decadez.epidemicbackend.annotation.UserLoginToken;
import peris.decadez.epidemicbackend.controller.ResponseData;
import peris.decadez.epidemicbackend.entity.Enum.GenderEnum;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.service.TokenService;
import peris.decadez.epidemicbackend.service.UserService;
import peris.decadez.epidemicbackend.utils.TokenUtil;

import java.util.Map;

@RestController
@RequestMapping("/mobile/user")
public class UserMobileController {
  @Autowired
  private UserService userService;

  @Autowired
  private TokenService tokenService;

  @UserLoginToken
  @GetMapping("/info")
  public ResponseData<?> info(HttpServletResponse response) {
    Long userId = Long.valueOf(TokenUtil.getTokenUserId());
    return new ResponseData<>(200, true, userService.findUserById(userId));
  }

  @GetMapping("/wxLogin")
  public ResponseData<?> wxLogin(Long openId, HttpServletResponse response) {
    JSONObject jsonObject = new JSONObject();
    // 模拟wx用户登录
    User loginUser = userService.getById(openId);
    if (loginUser != null) {
      String token = tokenService.getToken(loginUser);
      jsonObject.put("token", token);
      Cookie cookie = new Cookie("token", token);
      cookie.setPath("/");
      response.addCookie(cookie);
      return new ResponseData<>(200, true, jsonObject);
    }
    return ResponseData.of(401, false, null, "用户不存在");
  }
}
