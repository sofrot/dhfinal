package com.backend.hotel.controller;
import org.springframework.http.ResponseEntity;
import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface ICRUDController<T> {

    ResponseEntity<?> findById(Integer id);

    ResponseEntity<?> create(T t) throws MessagingException, UnsupportedEncodingException;

    ResponseEntity<?> update(T t);

    ResponseEntity<?> delete(Integer id);

    ResponseEntity<?> findAll();

}
