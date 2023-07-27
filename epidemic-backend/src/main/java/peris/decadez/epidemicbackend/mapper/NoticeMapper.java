package peris.decadez.epidemicbackend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import peris.decadez.epidemicbackend.entity.Notice;

@Mapper
public interface NoticeMapper extends BaseMapper<Notice> {
}
