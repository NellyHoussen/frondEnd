package com.nellyhoussen.backend.mapStruct;

import com.nellyhoussen.backend.DTO.Reservation.ReservationDTO;
import com.nellyhoussen.backend.Entity.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    @Mapping(target = "voitureId", source = "voiture.id")
    @Mapping(target = "voitureLibelle", expression = "java(reservation.getVoiture().getMarque() + \" \" + reservation.getVoiture().getModele())")
    @Mapping(target = "clientId", source = "client.id")
    @Mapping(target = "clientNomComplet", expression = "java(reservation.getClient().getPrenom() + \" \" + reservation.getClient().getNom())")
    @Mapping(target = "statutReservation", source = "statut")
    ReservationDTO toDTO(Reservation reservation);

}