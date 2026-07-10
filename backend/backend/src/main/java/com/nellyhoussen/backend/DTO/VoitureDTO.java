package com.nellyhoussen.backend.DTO;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record VoitureDTO(
         Long id,

        @NotBlank(message = "La marque est obligatoire")
        String marque,
        @NotBlank(message = "Le modèle est obligatoire")
        String modele,
        @NotBlank(message = "L'immatriculation est obligatoire")
        String immatriculation,

        @NotNull(message = "Le prix par jour est obligatoire")
        @DecimalMin(value = "0.0", inclusive = false, message = "Le prix doit être positif")
        BigDecimal prixParJour,
        boolean disponible,
         String imageUrl
) {

}
