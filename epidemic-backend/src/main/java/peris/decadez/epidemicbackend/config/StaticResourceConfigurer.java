package peris.decadez.epidemicbackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfigurer implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                // win 不同开发环境需要注意路径
//                .addResourceLocations("file:///D:/DECADEZ/epidemic-master/server-static/");
                // mac
               .addResourceLocations("file:/Users/decadez/Desktop/my-project/epidemic-master/server-static/");
    }
}
