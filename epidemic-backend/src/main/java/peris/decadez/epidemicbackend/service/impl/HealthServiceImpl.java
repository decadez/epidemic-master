package peris.decadez.epidemicbackend.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peris.decadez.epidemicbackend.entity.Health;
import peris.decadez.epidemicbackend.mapper.HealthMapper;
import peris.decadez.epidemicbackend.service.HealthService;

import java.util.List;

@Service
public class HealthServiceImpl extends ServiceImpl<HealthMapper, Health> implements HealthService {
    @Autowired
    HealthMapper healthMapper;
    @Override
    public List<Health> getHealthList() {
        return healthMapper.selectList(null);
    }

    @Override
    public void updateHealth(Health health) {
        healthMapper.updateById(health);
    }

    @Override
    public void deleteHealth(int id) {
        healthMapper.deleteById(id);
    }

    @Override
    public void createHealth(Health health) {
        healthMapper.insert(health);
    }


}
