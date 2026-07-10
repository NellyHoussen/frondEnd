package com.nellyhoussen.backend.Error;

import com.nellyhoussen.backend.Error.AppException;
import org.springframework.http.HttpStatus;

//422--->probleme logique
public class BusinessRuleException extends AppException {
    public BusinessRuleException(String message){
        super(message, HttpStatus.UNPROCESSABLE_CONTENT);
    }
}
