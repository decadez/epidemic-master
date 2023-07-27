package peris.decadez.epidemicbackend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;
import peris.decadez.epidemicbackend.entity.User;

import java.util.Date;

@Service
public class TokenService {
  public String getToken(User user) {
    Date start = new Date();
    long currentTime = System.currentTimeMillis() + 60 * 60 * 1000;
    Date end = new Date(currentTime);
    return JWT.create().withAudience(String.valueOf(user.getId())).withIssuedAt(start).withExpiresAt(end)
            .sign(Algorithm.HMAC256(user.getPassword()));
  }
}
