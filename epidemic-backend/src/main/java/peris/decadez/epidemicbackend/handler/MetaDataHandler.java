package peris.decadez.epidemicbackend.handler;
import java.sql.Timestamp;
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MetaDataHandler implements MetaObjectHandler {

  @Override
  public void insertFill(MetaObject metaObject) {
    this.setFieldValByName("createAt", new Timestamp(System.currentTimeMillis()),metaObject);
    this.setFieldValByName("editAt", new Timestamp(System.currentTimeMillis()),metaObject);

  }

  @Override
  public void updateFill(MetaObject metaObject) {
    this.setFieldValByName("editAt", new Timestamp(System.currentTimeMillis()),metaObject);
  }
}
