package com.nellyhoussen.backend.Controller;

import com.nellyhoussen.backend.DTO.Reservation.ReservationCompleteDTO;
import com.nellyhoussen.backend.DTO.Reservation.ReservationCreateDTO;
import com.nellyhoussen.backend.DTO.Reservation.ReservationDTO;
import com.nellyhoussen.backend.Enum.StatutReservation;
import com.nellyhoussen.backend.Service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationDTO> creer(@Valid @RequestBody ReservationCreateDTO dto) {
        ReservationDTO creee = reservationService.creer(dto);
        return ResponseEntity.created(URI.create("/api/v1/reservations/" + creee.id())).body(creee);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> obtenirParId(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> lister() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<ReservationDTO>> listerParClient(@PathVariable Long clientId) {
        return ResponseEntity.ok(reservationService.findByClient(clientId));
    }

    @PatchMapping("/{id}/statut")
    public ResponseEntity<ReservationDTO> changerStatut(
            @PathVariable Long id,
            @RequestParam StatutReservation valeur) {
        return ResponseEntity.ok(reservationService.changerStatut(id, valeur));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> annuler(@PathVariable Long id) {
        reservationService.annuler(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/complete")
    public ResponseEntity<ReservationDTO> creerReservationComplete(
            @Valid @RequestBody ReservationCompleteDTO dto) {
        ReservationDTO reservation = reservationService.creerAvecMiseAJourClient(
                dto.client(), dto.reservation());
        return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
    }
}
