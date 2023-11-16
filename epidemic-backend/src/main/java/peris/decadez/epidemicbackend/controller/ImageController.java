package peris.decadez.epidemicbackend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import peris.decadez.epidemicbackend.storage.ImageStorage;

import java.io.IOException;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/webapi/image")
public class ImageController {

    @Autowired
    private ImageStorage imageStorage;

    @PostMapping("uploadImage")
    public ResponseData<?> uploadImage(@RequestParam("file") MultipartFile image) {
        try {
            // 存储图片文件
            String imagePath = imageStorage.storeImage(image.getOriginalFilename(), image.getBytes());
            return ResponseData.of(200, true, Map.of("imagePath", imagePath));
        } catch (IOException e) {
            return ResponseData.of(408, true, null, "上传失败");
        }
    }

}
