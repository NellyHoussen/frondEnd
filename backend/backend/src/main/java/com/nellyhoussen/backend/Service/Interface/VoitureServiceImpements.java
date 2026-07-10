package com.nellyhoussen.backend.Service.Interface;

import com.nellyhoussen.backend.DTO.VoitureDTO;

import java.util.List;

public interface VoitureServiceImpements {
    VoitureDTO creer (VoitureDTO dto);
    VoitureDTO findById(Long id );
    List<VoitureDTO> findAll();
    List<VoitureDTO> findByDisponbility();
    VoitureDTO update(Long id, VoitureDTO dto);
    void supprimer(Long id);

}
