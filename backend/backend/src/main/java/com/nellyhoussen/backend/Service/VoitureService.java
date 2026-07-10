package com.nellyhoussen.backend.Service;

import com.nellyhoussen.backend.DTO.VoitureDTO;
import com.nellyhoussen.backend.Entity.Voiture;
import com.nellyhoussen.backend.Error.ConflitException;
import com.nellyhoussen.backend.Error.RessourceNotFoundException;
import com.nellyhoussen.backend.Repository.VoitureRepository;
import com.nellyhoussen.backend.Service.Interface.VoitureServiceImpements;
import com.nellyhoussen.backend.mapStruct.VoitureMapper;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class VoitureService implements VoitureServiceImpements {
    private final VoitureRepository voitureRepository;
    private final VoitureMapper mapper;

    @Override
    public VoitureDTO creer(VoitureDTO dto) {
        return creer(dto, dto.imageUrl());
    }

    public VoitureDTO creer(VoitureDTO dto, String imageUrl) {
        if (voitureRepository.existsByImmatriculation(dto.immatriculation())) {
            throw new ConflitException("Une voiture avec l'immatriculation " + dto.immatriculation() + " existe déjà");
        }
        Voiture voiture = mapper.toEntity(dto);
        voiture.setId(null);
        voiture.setDisponible(true);
        voiture.setImageUrl(imageUrl);
        return mapper.toDTO(voitureRepository.save(voiture));
    }

    @Override
    @Transactional(readOnly = true)
    public VoitureDTO findById(Long id) {
        return mapper.toDTO(findBy(id));
    }

    @Override
    public List<VoitureDTO> findAll() {
        return voitureRepository.findAll().stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Override
    public List<VoitureDTO> findByDisponbility() {
        return voitureRepository.findByDisponibleTrue()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Override
    public VoitureDTO update(Long id, VoitureDTO dto) {
        Voiture voiture = findBy(id);

        voitureRepository.findByImmatriculation(dto.immatriculation())
                .filter(v -> !v.getId().equals(id))
                .ifPresent(v -> {
                    throw new ConflitException("Une autre voiture utilise déjà cette immatriculation");
                });
        voiture.setMarque(dto.marque());
        voiture.setModele(dto.modele());
        voiture.setImmatriculation(dto.immatriculation());
        voiture.setPrixParJour(dto.prixParJour());
        voiture.setDisponible(dto.disponible());
        return this.mapper.toDTO(voitureRepository.save(voiture));
    }

    @Override
    public void supprimer(Long id) {
        Voiture as = findBy(id);
        this.voitureRepository.delete(as);
    }

    private Voiture findBy(Long id) {
        return voitureRepository.findById(id)
                .orElseThrow(() -> RessourceNotFoundException.pour("Voiture", id));
    }
}