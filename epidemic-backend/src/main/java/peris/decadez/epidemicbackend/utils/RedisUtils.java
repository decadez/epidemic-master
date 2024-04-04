package peris.decadez.epidemicbackend.utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class RedisUtils {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 设置缓存
     * @param key 缓存键
     * @param value 缓存值
     */
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 设置带有过期时间的缓存
     * @param key 缓存键
     * @param value 缓存值
     * @param timeout 过期时间，单位秒
     */
    public void set(String key, Object value, long timeout, TimeUnit timeUnit) {
        redisTemplate.opsForValue().set(key, value, timeout, timeUnit);
    }

    /**
     * 获取缓存
     * @param key 缓存键
     * @param <T>
     * @return 缓存值
     */
    public <T> T get(String key) {
        return (T) redisTemplate.opsForValue().get(key);
    }
}
