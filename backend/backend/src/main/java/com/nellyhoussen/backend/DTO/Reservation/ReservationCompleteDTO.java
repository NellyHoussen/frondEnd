package com.nellyhoussen.backend.DTO.Reservation;

import com.nellyhoussen.backend.DTO.ClientDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record ReservationCompleteDTO(
        @Valid @NotNull ClientDTO client,
        @Valid @NotNull ReservationCreateDTO reservation
) {
}
