package com.nellyhoussen.backend.mapStruct;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Dossier racine où les images sont stockées sur le disque
        String uploadDir = "uploads";
        String uploadPath = Paths.get(uploadDir).toAbsolutePath().toUri().toString();
        
        // Sécurité : s'assurer que l'URI se termine par un '/'
        if (!uploadPath.endsWith("/")) {
            uploadPath += "/";
        }

        // Capture les requêtes HTTP commençant par /images/
        registry.addResourceHandler("/images/**")
                .addResourceLocations(uploadPath);
    }
}