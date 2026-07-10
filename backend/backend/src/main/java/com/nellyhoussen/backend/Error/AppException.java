package com.nellyhoussen.backend.Error;

import org.springframework.http.HttpStatus;

public abstract class  AppException extends RuntimeException{
    private final HttpStatus status;
    protected AppException(String message,HttpStatus status){
        super(message);
        this.status = status;

    }
    public HttpStatus getStatus(){
        return status;
    }
}
