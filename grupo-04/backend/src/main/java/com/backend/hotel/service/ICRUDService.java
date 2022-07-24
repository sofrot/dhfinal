package com.backend.hotel.service;

import java.util.List;

public interface ICRUDService<T> {

    T findById(Integer id);

    T save(T t);

    T update(T t);

    void deleteById(Integer id);

    List<T> findAll();
}
