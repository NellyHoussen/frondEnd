package com.nellyhoussen.backend.DTO.Reservation;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ReservationCreateDTO(
        @NotNull(message = "L'id de la voiture est obligatoire")
        Long voitureId,
        @NotNull(message = "L'id du client est obligatoire")
        Long clientId,
        @NotNull(message = "La date de début est obligatoire")
        @FutureOrPresent(message = "La date de début ne peut pas être dans le passé")
        LocalDate dateDebut,
        @NotNull(message = "La date de fin est obligatoire")
        @Future(message = "La date de fin doit être dans le futur")
        LocalDate dateFin

) {
}
