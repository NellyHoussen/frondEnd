package com.nellyhoussen.backend.DTO.Car;

public record CarResponse(
        Long id,
        String brand,
        String model,
        String plate,
        int year,
        Long ownerId,
        String ownerName
) {
}
