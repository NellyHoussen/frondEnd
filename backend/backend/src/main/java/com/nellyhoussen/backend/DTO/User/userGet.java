package com.nellyhoussen.backend.DTO.User;

import com.nellyhoussen.backend.Enum.Role;

public record userGet(
        Long id,
        String identifiant,
        Role role,
        Long clientId
) {
}