package com.nellyhoussen.backend.Error;

import com.nellyhoussen.backend.Error.AppException;
import org.springframework.http.HttpStatus;

public class ConflitException extends AppException {
    public ConflitException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
