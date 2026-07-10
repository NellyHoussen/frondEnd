package com.nellyhoussen.backend.Service;

import com.nellyhoussen.backend.DTO.ClientDTO;
import com.nellyhoussen.backend.DTO.Reservation.ReservationCreateDTO;
import com.nellyhoussen.backend.DTO.Reservation.ReservationDTO;
import com.nellyhoussen.backend.Entity.Client;
import com.nellyhoussen.backend.Entity.Reservation;
import com.nellyhoussen.backend.Entity.Voiture;
import com.nellyhoussen.backend.Enum.StatutReservation;
import com.nellyhoussen.backend.Error.BusinessRuleException;
import com.nellyhoussen.backend.Error.RessourceNotFoundException;
import com.nellyhoussen.backend.Repository.ClientRepository;
import com.nellyhoussen.backend.Repository.ReservationRepository;
import com.nellyhoussen.backend.Repository.VoitureRepository;
import com.nellyhoussen.backend.Service.Interface.ClientServiceImplements;
import com.nellyhoussen.backend.Service.Interface.ReservationImplements;
import com.nellyhoussen.backend.mapStruct.ReservationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Transactional
@Service
@RequiredArgsConstructor
public class ReservationService implements ReservationImplements {
    private final ReservationRepository reservationRepository;
    private final VoitureRepository voitureRepository;
    private final ClientRepository clientRepository;
    private final ReservationMapper reservationMapper;
    private final ClientServiceImplements clientService;
    private static final Map<StatutReservation, Set<StatutReservation>> TRANSITIONS_AUTORISEES = Map.of(
            StatutReservation.EN_ATTENTE, EnumSet.of(StatutReservation.CONFIRMEE, StatutReservation.ANNULEE),
            StatutReservation.CONFIRMEE, EnumSet.of(StatutReservation.EN_COURS, StatutReservation.ANNULEE),
            StatutReservation.EN_COURS, EnumSet.of(StatutReservation.TERMINEE),
            StatutReservation.TERMINEE, EnumSet.noneOf(StatutReservation.class),
            StatutReservation.ANNULEE, EnumSet.noneOf(StatutReservation.class)
    );
    @Override
    public ReservationDTO creer(ReservationCreateDTO dto) {
        if(!dto.dateFin().isAfter(dto.dateDebut())){
            throw new BusinessRuleException("La date de fin doit être postérieure à la date de début");
        }
        Voiture voiture = voitureRepository.findById(dto.voitureId())
                .orElseThrow(() -> RessourceNotFoundException.pour("Voiture", dto.voitureId()));
        Client client = clientRepository.findById(dto.clientId())
                .orElseThrow(() -> RessourceNotFoundException.pour("Client", dto.clientId()));
        if(!voiture.isDisponible()){
            throw new BusinessRuleException("Cette voiture n'est pas disponible actuellement");
        }
        boolean chevauche = reservationRepository.existsChevauchement(
                voiture.getId(), dto.dateDebut(), dto.dateFin(), StatutReservation.ANNULEE);
        long nbJours = ChronoUnit.DAYS.between(dto.dateDebut(), dto.dateFin());
        BigDecimal montantTotal = voiture.getPrixParJour().multiply(BigDecimal.valueOf(nbJours));
        Reservation reservation = Reservation.builder()
                .voiture(voiture)
                .client(client)
                .dateDebut(dto.dateDebut())
                .dateFin(dto.dateFin())
                .montantTotal(montantTotal)
                .statut(StatutReservation.EN_ATTENTE)
                .build();

        return reservationMapper.toDTO(reservationRepository.save(reservation));
    }

    @Override
    @Transactional(readOnly = true)
    public ReservationDTO findById(Long id) {
        return   reservationMapper.toDTO(findBy(id));
    }
    @Override
    @Transactional(readOnly = true)
    public List<ReservationDTO> findAll() {
        return this.reservationRepository.findAll()
                .stream()
                .map(reservationMapper::toDTO)
                .toList();
    }
    @Override
    public List<ReservationDTO> findByClient(Long clientId) {
        return this.reservationRepository.findByClientId(clientId)
                .stream()
                .map(reservationMapper::toDTO)
                .toList();


    }
    @Override
    public ReservationDTO changerStatut(Long id, StatutReservation nouveauStatut) {
        Reservation reservation = findBy(id);

        Set<StatutReservation> transitionsPossibles = TRANSITIONS_AUTORISEES.get(reservation.getStatut());
        if (!transitionsPossibles.contains(nouveauStatut)) {
            throw new BusinessRuleException(
                    "Transition invalide : " + reservation.getStatut() + " -> " + nouveauStatut);
        }
        reservation.setStatut(nouveauStatut);
        return reservationMapper.toDTO(reservationRepository.save(reservation));
    }
    @Override
    public void annuler(Long id) {
        changerStatut(id, StatutReservation.ANNULEE);
    }

    @Override
    public ReservationDTO creerAvecMiseAJourClient(ClientDTO clientDto, ReservationCreateDTO reservationDto) {
        clientService.update(clientDto.id(), clientDto);
        return this.creer(reservationDto);
    }

    private Reservation findBy(Long id){
        return this.reservationRepository.findById(id)
                .orElseThrow(() -> RessourceNotFoundException.pour("message",id));
    }
}
