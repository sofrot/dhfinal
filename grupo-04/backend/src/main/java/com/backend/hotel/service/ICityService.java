package com.backend.hotel.service;

import com.backend.hotel.dto.CityDTO;

import java.util.List;

public interface ICityService extends ICRUDService<CityDTO> {
    List<CityDTO> findAllByNameCountry(String name, String country);
}
