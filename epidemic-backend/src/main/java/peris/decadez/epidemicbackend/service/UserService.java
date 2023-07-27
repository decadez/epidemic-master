package peris.decadez.epidemicbackend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import peris.decadez.epidemicbackend.entity.User;

public interface UserService extends IService<User> {
  public String register(User user);
  public User findUserById(Long userId);
  public User login(User user);
}
