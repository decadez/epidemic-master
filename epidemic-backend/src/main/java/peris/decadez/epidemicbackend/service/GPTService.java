package peris.decadez.epidemicbackend.service;

import cn.hutool.json.JSONObject;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.alibaba.dashscope.aigc.generation.Generation;
import com.alibaba.dashscope.aigc.generation.GenerationResult;
import com.alibaba.dashscope.aigc.generation.models.QwenParam;
import com.alibaba.dashscope.exception.ApiException;
import com.alibaba.dashscope.exception.InputRequiredException;
import com.alibaba.dashscope.exception.NoApiKeyException;
import com.alibaba.dashscope.utils.JsonUtils;

@Service
public class GPTService {
    private static Logger logger = LoggerFactory.getLogger(GPTService.class);
    private static final String API_URL = "https://api.openaliyun.com/gpt3.5/chitown";
    private static final String API_KEY = "sk-7b5898d57c1f43959303bda6c9230b88";
    private static final QwenParam.QwenParamBuilder<?, ?> QWEN_PARAM_BUILDER = QwenParam.builder().model(Generation.Models.QWEN_TURBO).apiKey(API_KEY);

    public static JsonObject aiTask(String prompt) {
        try {
            return qwenQuickStart(prompt);
        } catch (ApiException | NoApiKeyException | InputRequiredException e) {
            System.out.println(String.format("Exception %s", e.getMessage()));
        }
        return null;
    }

    public static JsonObject qwenQuickStart(String prompt)
            throws NoApiKeyException, ApiException, InputRequiredException {
        Generation gen = new Generation();
        QwenParam param = QWEN_PARAM_BUILDER.prompt(prompt)
                .topP(0.8).build();
        GenerationResult result = gen.call(param);
        logger.info("通义千问 -> {}", JsonUtils.toJsonObject(result));
        return JsonUtils.toJsonObject(result);
    }

//    public static void qwenQuickStartCallback(String prompt)
//            throws NoApiKeyException, ApiException, InputRequiredException, InterruptedException {
//        Generation gen = new Generation();
//        QwenParam param = QWEN_PARAM_BUILDER.prompt(prompt)
//                .topP(0.8).build();
//        Semaphore semaphore = new Semaphore(0);
//        gen.call(param, new ResultCallback<GenerationResult>() {
//
//            @Override
//            public void onEvent(GenerationResult message) {
//                System.out.println(message);
//            }
//            @Override
//            public void onError(Exception ex){
//                System.out.println(ex.getMessage());
//                semaphore.release();
//            }
//            @Override
//            public void onComplete(){
//                System.out.println("onComplete");
//                semaphore.release();
//            }
//
//        });
//        semaphore.acquire();
//    }
}
