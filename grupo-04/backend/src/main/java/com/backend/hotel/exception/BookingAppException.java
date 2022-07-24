package com.backend.hotel.exception;

import org.springframework.http.HttpStatus;

public class BookingAppException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    private HttpStatus httpStatus;
    private String errorMessage;

    public BookingAppException(HttpStatus httpStatus, String errorMessage) {
        super();
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }

    public BookingAppException(String message) {
        super(message);
    }


}
