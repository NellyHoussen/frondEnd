package com.nellyhoussen.backend.DTO.Car;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CarRequest(
        @NotBlank(message = "La marque est obligatoire")
        String brand,

        @NotBlank(message = "Le modèle est obligatoire")
        String model,

        @NotBlank(message = "L'immatriculation est obligatoire")
        String plate,

        @Min(value = 1886, message = "Année invalide")
        @Max(value = 2100, message = "Année invalide")
        int year,

        @NotNull(message = "L'identifiant du propriétaire est obligatoire")
        Long ownerId
) {
}
