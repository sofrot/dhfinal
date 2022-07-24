package com.backend.hotel.persistence.repository;
import com.backend.hotel.persistence.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IScoreRepository extends JpaRepository<Score, Integer> {

}
