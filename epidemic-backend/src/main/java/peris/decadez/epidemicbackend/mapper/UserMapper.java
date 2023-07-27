package peris.decadez.epidemicbackend.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.*;
import peris.decadez.epidemicbackend.entity.User;

@Mapper
public interface UserMapper extends BaseMapper<User> {}