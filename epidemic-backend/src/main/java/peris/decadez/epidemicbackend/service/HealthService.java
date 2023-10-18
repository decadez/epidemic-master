package peris.decadez.epidemicbackend.service;


import com.baomidou.mybatisplus.extension.service.IService;
import peris.decadez.epidemicbackend.entity.Health;

import java.util.List;

public interface HealthService extends IService<Health> {
    List<Health> getHealthList();

    void updateHealth(Health health);

    void deleteHealth(int id);

    void createHealth(Health health);
}
