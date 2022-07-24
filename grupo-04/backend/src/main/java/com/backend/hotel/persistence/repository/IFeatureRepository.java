package com.backend.hotel.persistence.repository;
import com.backend.hotel.persistence.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Integer> {
}
