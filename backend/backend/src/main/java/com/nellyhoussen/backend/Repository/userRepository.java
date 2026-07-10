package com.nellyhoussen.backend.Repository;

import com.nellyhoussen.backend.Entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<user,Long> {
    Optional<user> findByIdentifiant(String identifiant);
    boolean existsByIdentifiant(String identifiant);
}
