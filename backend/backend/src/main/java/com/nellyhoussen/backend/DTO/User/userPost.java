package com.nellyhoussen.backend.DTO.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record userPost(
        Long id,
        @NotBlank(message = "veuillez saisir votre nom")
        String identifiant,
        @Size(min = 8)
        String password
) {
}
