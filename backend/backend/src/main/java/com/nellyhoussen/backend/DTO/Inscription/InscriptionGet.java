package com.nellyhoussen.backend.DTO.Inscription;

import com.nellyhoussen.backend.Enum.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record InscriptionGet(
        Long id,
        String identifiant,
        @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
        String password,
        @Size(min = 8)
        String checkPassword,
        @NotBlank(message = "Le nom est obligatoire")
        String nom,
        @NotBlank(message = "Le prénom est obligatoire")
        String prenom,
        @NotBlank(message = "L'email est obligatoire")
        @Email(message = "Email invalide")
        String email,
        @NotBlank(message = "Le téléphone est obligatoire")
        String telephone
) {
}
