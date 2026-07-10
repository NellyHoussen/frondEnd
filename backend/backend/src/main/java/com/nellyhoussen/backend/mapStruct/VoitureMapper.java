package com.nellyhoussen.backend.mapStruct;

import com.nellyhoussen.backend.DTO.Car.CarRequest;
import com.nellyhoussen.backend.DTO.Car.CarResponse;
import com.nellyhoussen.backend.DTO.VoitureDTO;

import com.nellyhoussen.backend.Entity.Voiture;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VoitureMapper {


    VoitureDTO toDTO(Voiture request);

    Voiture toEntity(VoitureDTO car);
}