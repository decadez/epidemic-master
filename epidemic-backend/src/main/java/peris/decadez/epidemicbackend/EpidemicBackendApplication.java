package peris.decadez.epidemicbackend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("peris.decadez.epidemicbackend.mapper")
public class EpidemicBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(EpidemicBackendApplication.class, args);
  }

}
