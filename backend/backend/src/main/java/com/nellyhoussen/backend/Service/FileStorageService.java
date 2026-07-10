package com.nellyhoussen.backend.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Path IMAGE_DIR = Paths
            .get("D:/frondEnd/backend/backend/uploads/images")
            .toAbsolutePath()
            .normalize();

    public String store(MultipartFile file) {
        try {
            Files.createDirectories(IMAGE_DIR);

            String originalName = file.getOriginalFilename();
            String extension = getExtension(originalName);

            String fileName = UUID.randomUUID().toString() + extension;
            Path targetPath = IMAGE_DIR.resolve(fileName).normalize();

            Files.copy(
                    file.getInputStream(),
                    targetPath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            System.out.println("Image sauvegardée ici : " + targetPath);

            return "/images/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'enregistrement de l'image", e);
        }
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }

        return filename.substring(filename.lastIndexOf("."));
    }
}