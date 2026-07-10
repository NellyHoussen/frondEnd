package com.nellyhoussen.backend.Repository;

import com.nellyhoussen.backend.Entity.Reservation;
import com.nellyhoussen.backend.Enum.StatutReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {

    List<Reservation> findByClientId(Long clientId);

    List<Reservation> findByVoitureId(Long voitureId);

    @Query("""
            SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END
            FROM Reservation r
            WHERE r.voiture.id = :voitureId
            AND r.statut <> :statutExclu
            AND r.dateDebut <= :dateFin
            AND r.dateFin >= :dateDebut
            """)
    boolean existsChevauchement(
            @Param("voitureId") Long voitureId,
            @Param("dateDebut") LocalDate dateDebut,
            @Param("dateFin") LocalDate dateFin,
            @Param("statutExclu") StatutReservation statutExclu
    );

}
