package peris.decadez.epidemicbackend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import peris.decadez.epidemicbackend.entity.Health;




@Mapper
public interface HealthMapper extends BaseMapper<Health> {
}
