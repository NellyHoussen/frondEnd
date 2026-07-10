package com.nellyhoussen.backend.Service.Interface;

import com.nellyhoussen.backend.DTO.ClientDTO;

import java.util.List;

public interface ClientServiceImplements {
    ClientDTO creer(ClientDTO dto);
    ClientDTO FindById(Long id);
    List<ClientDTO> findAll();
    ClientDTO update(Long id,ClientDTO dto);
    void deleteById(Long id);
}
