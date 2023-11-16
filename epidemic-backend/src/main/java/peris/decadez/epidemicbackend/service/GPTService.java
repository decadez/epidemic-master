package peris.decadez.epidemicbackend.service;

import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class GPTService {
    private static final String API_URL = "https://api.openaliyun.com/gpt3.5/chitown";
    private static final String API_KEY = "your_api_key";
    private static final String API_SECRET = "your_api_secret";

    public String inference(String prompt) throws IOException {
        Gson gson = new Gson();

        // 构建请求
        HttpPost httpPost = new HttpPost(API_URL);
        StringEntity requestEntity = new StringEntity(gson.toJson(new ChatRequest(prompt)));
        httpPost.setEntity(requestEntity);
        httpPost.setHeader("Content-Type", "application/json");
        httpPost.setHeader("Authorization", getAuthorization());

        // 发送请求并获取响应
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = httpClient.execute(httpPost);
        try {
            HttpEntity entity = response.getEntity();
            String responseJson = EntityUtils.toString(entity);
            ChatResponse chatResponse = gson.fromJson(responseJson, ChatResponse.class);
            return chatResponse.choices.get(0).text;
        } finally {
            response.close();
            httpPost.releaseConnection();
        }
    }

    private String getAuthorization() {
        return "Key-" + API_KEY + ":" + API_SECRET;
    }

    // 请求和响应的POJO类
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class ChatRequest {
        private String prompt;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class ChatResponse {
        private List<ChatResponseItem> choices;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class ChatResponseItem {
        private String text;
    }
}
