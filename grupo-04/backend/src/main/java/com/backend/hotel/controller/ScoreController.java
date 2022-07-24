package com.backend.hotel.controller;
import com.backend.hotel.dto.ScoreDTO;
import com.backend.hotel.service.IScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/score")

public class ScoreController {

    @Autowired
    private IScoreService scoreService;

    @GetMapping("get/{id}")
    public ResponseEntity<ScoreDTO> findById(@PathVariable("id") Integer id) {
        ScoreDTO scoreDTO = scoreService.findById(id);
        return new ResponseEntity<>(scoreDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ScoreDTO> create(@RequestBody ScoreDTO scoreDTO) {
        return new ResponseEntity<>(scoreService.save(scoreDTO), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ScoreDTO> update(@PathVariable("id") Integer id, @RequestBody ScoreDTO scoreDTO) {
        scoreDTO.setId(id);
        return new ResponseEntity<>(scoreService.update(scoreDTO), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        scoreService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
