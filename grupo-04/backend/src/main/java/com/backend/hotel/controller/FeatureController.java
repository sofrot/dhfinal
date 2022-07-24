package com.backend.hotel.controller;
import com.backend.hotel.dto.FeatureDTO;
import com.backend.hotel.service.impl.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feature")

public class FeatureController{

    @Autowired
    private FeatureService featureService;

    @GetMapping("/find/{id}")
    public ResponseEntity<FeatureDTO> findById(@PathVariable("id") Integer id){
        return new ResponseEntity<>(featureService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<FeatureDTO> create(@RequestBody FeatureDTO featureDTO){
        return new ResponseEntity<>(featureService.save(featureDTO), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<FeatureDTO> update(@RequestBody FeatureDTO featureDTO){
        return new ResponseEntity<>(featureService.update(featureDTO), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id){
        featureService.deleteById(id);
        return new ResponseEntity<>("Delete success", HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<FeatureDTO>> findAll(){
        return new ResponseEntity<>(featureService.findAll(), HttpStatus.OK);
    }
}
