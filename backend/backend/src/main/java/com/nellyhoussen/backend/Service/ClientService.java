package com.nellyhoussen.backend.Service;

import com.nellyhoussen.backend.DTO.ClientDTO;
import com.nellyhoussen.backend.Entity.Client;
import com.nellyhoussen.backend.Error.ConflitException;
import com.nellyhoussen.backend.Error.RessourceNotFoundException;
import com.nellyhoussen.backend.Repository.ClientRepository;
import com.nellyhoussen.backend.Service.Interface.ClientServiceImplements;
import com.nellyhoussen.backend.mapStruct.ClientMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.hibernate.annotations.processing.Find;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class ClientService  implements ClientServiceImplements {
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    @Override
    public ClientDTO creer(ClientDTO dto) {
        if(clientRepository.existsByEmail(dto.email())){
            log.warn("email qui existe deja");
            throw  new ConflitException("email already exists");
        }
        Client client =clientMapper.toEntity(dto);
        client.setId(null);
        return clientMapper.toDTO(clientRepository.save(client));
    }

    @Override
    @Transactional(readOnly = true)
    public ClientDTO FindById(Long id) {
        return clientMapper.toDTO(findBy(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClientDTO> findAll() {
        return clientRepository.findAll().stream()
                .map(clientMapper::toDTO)
                .toList();
    }

    @Override
    public ClientDTO update(Long id, ClientDTO dto) {
        Client client = findBy(id);
        clientRepository.findByEmail(dto.email())
                .filter(c -> !c.getId().equals(id))
                .ifPresent(c -> {
                    throw  new ConflitException("autre clieny utilse id");
                });
        client.setNom(dto.nom());
        client.setPrenom(dto.prenom());
        client.setEmail(dto.email());
        client.setTelephone(dto.telephone());
        return clientMapper.toDTO(clientRepository.save(client));
    }

    @Override
    public void deleteById(Long id) {
        Client client = findBy(id);
        clientRepository.delete(client);
    }
    private Client findBy(Long id){

        return clientRepository.findById(id)
                .orElseThrow(()-> RessourceNotFoundException.pour("client",id));
    }
}
