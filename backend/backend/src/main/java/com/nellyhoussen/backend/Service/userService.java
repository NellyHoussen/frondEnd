package com.nellyhoussen.backend.Service;

import com.nellyhoussen.backend.DTO.Inscription.InscriptionGet;
import com.nellyhoussen.backend.DTO.Inscription.InscriptionPost;
import com.nellyhoussen.backend.DTO.User.userGet;
import com.nellyhoussen.backend.DTO.User.userPost;
import com.nellyhoussen.backend.Entity.Client;
import com.nellyhoussen.backend.Entity.user;
import com.nellyhoussen.backend.Error.ConflitException;
import com.nellyhoussen.backend.Error.RessourceNotFoundException;
import com.nellyhoussen.backend.Error.BusinessRuleException;
import com.nellyhoussen.backend.Repository.ClientRepository;
import com.nellyhoussen.backend.Repository.userRepository;
import com.nellyhoussen.backend.mapStruct.userMap;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class userService {

    private final userRepository repository;
    private final ClientRepository clientRepository;
    private final userMap mapper;

    public userService(userRepository repository, ClientRepository clientRepository, userMap mapper) {
        this.repository = repository;
        this.clientRepository = clientRepository;
        this.mapper = mapper;
    }

    @Transactional
    public InscriptionGet registre(InscriptionPost dto) {
        if (repository.existsByIdentifiant(dto.identifiant())) {
            log.warn("Identifiant déjà utilisé : {}", dto.identifiant());
            throw new ConflitException("Identifiant déjà utilisé");
        }
        if (!dto.password().equals(dto.checkPassword())) {
            log.warn("Mots de passe non identiques pour : {}", dto.identifiant());
            throw new BusinessRuleException("Les mots de passe ne correspondent pas");
        }
        if (clientRepository.findAll().stream().anyMatch(c -> c.getEmail().equalsIgnoreCase(dto.email()))) {
            log.warn("Email déjà utilisé : {}", dto.email());
            throw new ConflitException("Cet email est déjà associé à un compte");
        }

        user entity = mapper.toEntityRegistre(dto);
        user savedUser = repository.save(entity);

        Client client = Client.builder()
                .nom(dto.nom())
                .prenom(dto.prenom())
                .email(dto.email())
                .telephone(dto.telephone())
                .user(savedUser)
                .build();
        clientRepository.save(client);

        log.info("Utilisateur et client enregistrés avec succès : {}", savedUser.getIdentifiant());
        return mapper.toDtoRegistre(savedUser);
    }

    public userGet login(userPost dto) {
        user found = repository.findByIdentifiant(dto.identifiant())
                .orElseThrow(() -> {
                    log.warn("Identifiant introuvable : {}", dto.identifiant());
                    return RessourceNotFoundException.pour("User", null);
                });
        if (!dto.password().equals(found.getPassword())) {
            log.warn("Mot de passe incorrect pour : {}", dto.identifiant());
            throw new BusinessRuleException("Mot de passe incorrect");
        }
        log.info("Connexion réussie : {}", found.getIdentifiant());

        Long clientId = clientRepository.findByUserId(found.getId())
                .map(Client::getId)
                .orElse(null);

        return new userGet(found.getId(), found.getIdentifiant(), found.getRole(), clientId);
    }
}