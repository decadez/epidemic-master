package peris.decadez.epidemicbackend;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.hibernate.validator.HibernateValidator;
import org.hibernate.validator.HibernateValidatorFactory;
import org.hibernate.validator.PredefinedScopeHibernateValidator;
import org.hibernate.validator.messageinterpolation.ParameterMessageInterpolator;
import org.hibernate.validator.messageinterpolation.ResourceBundleMessageInterpolator;
import org.hibernate.validator.resourceloading.DelegatingResourceBundleLocator;
import org.hibernate.validator.resourceloading.PlatformResourceBundleLocator;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

import java.util.Locale;
import java.util.ResourceBundle;

@SpringBootApplication
@MapperScan("peris.decadez.epidemicbackend.mapper")
public class EpidemicBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(EpidemicBackendApplication.class, args);
  }


  @Bean
  public Validator validator() {
   return Validation.byProvider(HibernateValidator.class)
            .configure()
            .failFast(true)
            .defaultLocale(Locale.SIMPLIFIED_CHINESE)
           .messageInterpolator(new ResourceBundleMessageInterpolator(new PlatformResourceBundleLocator("messages")))
            .buildValidatorFactory()
            .getValidator();
  }

  @Bean
  public MethodValidationPostProcessor methodValidationPostProcessor(Validator validator) {
    MethodValidationPostProcessor methodValidationPostProcessor = new MethodValidationPostProcessor();
    methodValidationPostProcessor.setValidator(validator);
    return methodValidationPostProcessor;
  }

}
