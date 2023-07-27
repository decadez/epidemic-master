package peris.decadez.epidemicbackend.utils;

import com.auth0.jwt.JWT;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class TokenUtil {
  public static String getTokenUserId() {
    // http 请求头取token
    String token = getRequest().getHeader("token");
    return JWT.decode(token).getAudience().get(0);
  }

  public static HttpServletRequest getRequest() {
    ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
    return requestAttributes == null ? null :  requestAttributes.getRequest();
  }
}
