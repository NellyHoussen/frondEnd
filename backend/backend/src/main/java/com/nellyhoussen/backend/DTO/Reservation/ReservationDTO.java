package com.nellyhoussen.backend.DTO.Reservation;

import com.nellyhoussen.backend.Enum.StatutReservation;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ReservationDTO(
        Long id,
        Long voitureId,
        Long clientId,
        String clientNomComplet,
        LocalDate dateDebut,
        LocalDate dateFin,
        BigDecimal montantTotal,
        StatutReservation statutReservation,
        String voitureLibelle
) {
}
