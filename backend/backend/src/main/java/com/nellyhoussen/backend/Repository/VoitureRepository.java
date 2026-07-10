package com.nellyhoussen.backend.Repository;

import com.nellyhoussen.backend.Entity.Voiture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoitureRepository extends JpaRepository<Voiture, Long> {
    List<Voiture> findByDisponibleTrue();

    Optional<Voiture> findByImmatriculation(String immatriculation);

    boolean existsByImmatriculation(String immatriculation);
}
