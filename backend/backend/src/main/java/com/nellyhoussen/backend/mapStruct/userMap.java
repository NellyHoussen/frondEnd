package com.nellyhoussen.backend.mapStruct;

import com.nellyhoussen.backend.DTO.Inscription.InscriptionGet;
import com.nellyhoussen.backend.DTO.Inscription.InscriptionPost;
import com.nellyhoussen.backend.DTO.User.userGet;
import com.nellyhoussen.backend.DTO.User.userPost;
import com.nellyhoussen.backend.Entity.user;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface userMap {
    @Mapping(target = "id", ignore = true)
    user toEntity(userPost data);
    @Mapping(target = "clientId", ignore = true)
    userGet toDto(user data);
    @Mapping(target = "id", ignore = true)
    user toEntityRegistre(InscriptionPost data);
    InscriptionGet toDtoRegistre(user data);
}
