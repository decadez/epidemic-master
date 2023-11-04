package peris.decadez.epidemicbackend.interceptor;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import peris.decadez.epidemicbackend.annotation.PassToken;
import peris.decadez.epidemicbackend.annotation.UserLoginToken;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.service.impl.UserServiceImpl;
import peris.decadez.epidemicbackend.utils.TokenUtil;

import java.lang.reflect.Method;

public class AuthenticationInterceptor implements HandlerInterceptor {
  @Autowired
  UserServiceImpl userService;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    // 从 http 请求头中取出 token
    String token = request.getHeader("token");
    // 如果不是映射到方法直接通过
    if(!(handler instanceof HandlerMethod handlerMethod)) {
      return true;
    }
    Method method = handlerMethod.getMethod();
    // 检查是否有pass-token注释，有则跳过认证
    if (method.isAnnotationPresent(PassToken.class)) {
      PassToken passToken = method.getAnnotation(PassToken.class);
      if (passToken.required()) {
        return true;
      }
    }
    //检查有没有需要用户权限的注解
    if (method.isAnnotationPresent(UserLoginToken.class)) {
      UserLoginToken userLoginToken = method.getAnnotation(UserLoginToken.class);
      if (userLoginToken.required()) {
        // 执行认证
        if (token == null) {
          throw new RuntimeException("无token，请重新登录");
        }
        // 获取 token 中的 user id
        String userId;
        try {
          userId = TokenUtil.getTokenUserId();
        } catch (JWTDecodeException j) {
          throw new RuntimeException("用户不存在，请重新登录");
        }
        User user = userService.findUserById(Long.valueOf(userId));
        if (user == null) {
          throw new RuntimeException("用户不存在，请重新登录");
        }
        // 验证 token
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getPassword())).build();
        try
        {
          jwtVerifier.verify(token);
        } catch (JWTVerificationException e) {
          throw new RuntimeException("请重新登陆");
        }
        return true;
      }
    }
    return true;
  }
}
