package com.backend.hotel.service.impl;
import com.backend.hotel.dto.ScoreDTO;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Reservation;
import com.backend.hotel.persistence.entity.Score;
import com.backend.hotel.persistence.repository.IReservationRepository;
import com.backend.hotel.persistence.repository.IScoreRepository;
import com.backend.hotel.service.IScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScoreService implements IScoreService {

    @Autowired
    private IScoreRepository scoreRepository;
    @Autowired
    private IReservationRepository reservationRepository;


    @Override
    public ScoreDTO findById(Integer id) {
        Score score = scoreRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Score","id",id));
        return score.toDTO();
    }

    @Override
    public ScoreDTO save(ScoreDTO scoreDTO) {
        List<Reservation> reservations= reservationRepository.findByUser_id(scoreDTO.getUser().getId());
        //validar que el usuario tenga una reserva
        for(Reservation reservationUser: reservations){
            if(reservationUser.getProduct().getId().equals(scoreDTO.getProduct().getId()) && reservationUser.getUser().getId().equals(scoreDTO.getUser().getId())){
                Score score = scoreRepository.save(scoreDTO.toEntity());
                return score.toDTO();
            }
        }
        throw new ResourceNotFoundException("Reservation","user_id",scoreDTO.getUser().getId());
    }

    @Override
    public ScoreDTO update(ScoreDTO scoreDTO) {
        Score score = scoreRepository.findById(scoreDTO.getId())
                .orElseThrow(()-> new ResourceNotFoundException("Score","id",scoreDTO.getId()));
        scoreRepository.save(score);
        return score.toDTO();
    }

    @Override
    public void deleteById(Integer id) {
        Score score = scoreRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Score","id",id));
        scoreRepository.delete(score);
    }

    @Override
    public List<ScoreDTO> findAll() {
        List<Score> scores = scoreRepository.findAll();
        return scores.stream().map(Score::toDTO).collect(Collectors.toList());
    }
}
