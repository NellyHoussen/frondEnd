package com.nellyhoussen.backend.Error;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ErrorResponse {

    final Instant timestamp;
    final int status;
    final String error;
    final String message;
    final String path;
    List<FieldError> validationErrors;

    @Getter
    @AllArgsConstructor
    public static class FieldError {
        final String field;
        final String message;
    }
}