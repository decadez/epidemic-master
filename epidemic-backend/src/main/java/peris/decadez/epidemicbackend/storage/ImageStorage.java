package peris.decadez.epidemicbackend.storage;

import cn.hutool.core.lang.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

@Component
public class ImageStorage {

    private String imagePath;

    @Value("${image.path}")
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String storeImage(String imageName, byte[] imageBytes) {
        String imagePath = this.imagePath + "/"+ UUID.randomUUID() + imageName.substring(imageName.lastIndexOf("."));
        File dir = new File(imagePath);
        dir.getParentFile().mkdirs();
        // 写入文件
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(dir);
            fos.write(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return imagePath;
    }

    public byte[] getImageBytes(String imageName) {
        File file = new File(this.imagePath + "/" + imageName);
        if (!file.exists()) {
            return null;
        }
        byte[] imageBytes = null;
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(file);
            int length = (int) file.length();
            imageBytes = new byte[length];
            fis.read(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return imageBytes;
    }

}