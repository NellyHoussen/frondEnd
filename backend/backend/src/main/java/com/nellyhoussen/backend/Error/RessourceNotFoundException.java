package com.nellyhoussen.backend.Error;

import com.nellyhoussen.backend.Error.AppException;
import org.springframework.http.HttpStatus;

public class RessourceNotFoundException extends AppException {
    public RessourceNotFoundException(String message) {
        super( message , HttpStatus.NOT_FOUND);
    }
    public  static RessourceNotFoundException pour(String ressource,Long id){
        return  new RessourceNotFoundException(ressource+ "introuvable avec id" + id);
    }
}