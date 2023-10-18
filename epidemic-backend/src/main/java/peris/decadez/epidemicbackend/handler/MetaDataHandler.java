package peris.decadez.epidemicbackend.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MetaDataHandler implements MetaObjectHandler {

  @Override
  public void insertFill(MetaObject metaObject) {
    this.setFieldValByName("createAt",new Date(),metaObject);
    this.setFieldValByName("register",new Date(),metaObject);
    this.setFieldValByName("updateTime",new Date(),metaObject);
  }

  @Override
  public void updateFill(MetaObject metaObject) {
    this.setFieldValByName("updateTime",new Date(),metaObject);
  }
}
