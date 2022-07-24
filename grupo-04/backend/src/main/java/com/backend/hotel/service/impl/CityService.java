package com.backend.hotel.service.impl;

import com.backend.hotel.dto.CityDTO;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.City;
import com.backend.hotel.persistence.repository.ICityRepository;
import com.backend.hotel.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.regex.*;

import java.util.ArrayList;
import java.util.List;

@Service
public class CityService implements ICityService {

    @Autowired
    private ICityRepository cityRepository;

    public List<CityDTO> findAllByNameCountry(String name, String country){
        System.out.println(name.matches("[a-zA-Z]")); //tratando de validar con regular expresion
        List<City> cities = cityRepository.findAllByNameCountry(name, country);
        assert cities.isEmpty() != true;
        List<CityDTO> citiesDTO = new ArrayList<>();
        for(City c : cities){ citiesDTO.add(c.toDTO()); }
        return citiesDTO;
    }

    @Override
    public CityDTO findById(Integer id) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe ninguna ciudad con el id ingresado"));
        return city.toDTO();
    }

    @Override
    public CityDTO save(CityDTO cityDTO) {
        City city = cityRepository.save(cityDTO.toEntity());
        assert city != null;//a consultar
        return city.toDTO();
    }

    @Override
    public CityDTO update(CityDTO cityDTO) {
        assert cityRepository.findById(cityDTO.getId()).orElse(null) != null; // la ciudad a actualizar existe;
        City city = cityRepository.save(cityDTO.toEntity()); //guardo
        assert city != null; //valido si la guardo exitosamente
        return city.toDTO();
    }

    @Override
    public void deleteById(Integer id) {
        cityRepository.deleteById(id);
    }

    @Override
    public List<CityDTO> findAll() {
        List<City> cityList = cityRepository.findAll();
        assert cityList.isEmpty() != true;
        List<CityDTO> cityListDTO = new ArrayList<>();
        for(City city : cityList){ cityListDTO.add(city.toDTO()); }
        return cityListDTO;
    }
}
