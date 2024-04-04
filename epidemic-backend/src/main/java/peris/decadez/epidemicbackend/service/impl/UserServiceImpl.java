package peris.decadez.epidemicbackend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import peris.decadez.epidemicbackend.entity.User;
import peris.decadez.epidemicbackend.mapper.UserMapper;
import peris.decadez.epidemicbackend.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

  @Autowired
  UserMapper userMapper;

  @Override
  public String register(User user) {
    return null;
  }

  @Override
  public User findUserById(Long userId) {
    return userMapper.selectById(userId);
  }

  public List<User> getAll() {
    return userMapper.selectList(null);
  }

  @Override
  public User login(User user) {
    Map<String, Object> columnsMap = new HashMap<>();
    if(user.getUsername() != null) {
      columnsMap.put("username", user.getUsername());
    }
    if(user.getEmail() != null) {
      columnsMap.put("email", user.getEmail());
    }
    List<User> users = userMapper.selectByMap(columnsMap);
    if (!users.isEmpty() && user.getPassword().equals(users.get(0).getPassword())) {
      return users.get(0);
    }
    return null;
  }

  public List<User> findUserByMap(Map<String, Object> columnsMap) {

    return listByMap(columnsMap);

//    return userMapper.selectByMap(columnsMap);
  }
}
