package com.nellyhoussen.backend.Service.Interface;

import com.nellyhoussen.backend.DTO.ClientDTO;
import com.nellyhoussen.backend.DTO.Reservation.ReservationCreateDTO;
import com.nellyhoussen.backend.DTO.Reservation.ReservationDTO;
import com.nellyhoussen.backend.Enum.StatutReservation;

import java.util.List;

public interface ReservationImplements {
    ReservationDTO creer(ReservationCreateDTO dto);
    ReservationDTO findById(Long id);
    List<ReservationDTO> findAll();
    List <ReservationDTO> findByClient (Long clientId);
    ReservationDTO changerStatut(Long id, StatutReservation newStatuts);
    void annuler(Long id);
    ReservationDTO creerAvecMiseAJourClient(ClientDTO clientDto, ReservationCreateDTO reservationDto);
    void supprimer(Long id);
}
