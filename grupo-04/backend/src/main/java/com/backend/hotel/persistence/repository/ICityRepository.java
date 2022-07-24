package com.backend.hotel.persistence.repository;


import com.backend.hotel.persistence.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICityRepository extends JpaRepository<City, Integer> {
    @Query("from City c where c.name like %:name% and c.country like %:country%")
    List<City> findAllByNameCountry(@Param("name") String name, @Param("country") String country);
}
