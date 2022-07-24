package com.backend.hotel.controller;
import com.backend.hotel.dto.CityDTO;
import com.backend.hotel.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController implements ICRUDController<CityDTO> {

    @Autowired
    public ICityService cityService;

    @Override
    @GetMapping("/get/{id}")
    public ResponseEntity<CityDTO> findById(@PathVariable Integer id) {
        CityDTO cityDTO = cityService.findById(id);
        return ResponseEntity.ok(cityDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    @PostMapping("/create")
    public ResponseEntity<CityDTO> create(@RequestBody CityDTO cityDTO) {
        CityDTO resCityDTO = cityService.save(cityDTO);

        return ResponseEntity.ok(resCityDTO); // ver no me deja .created
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    @PutMapping("/update")
    public ResponseEntity<CityDTO> update(@RequestBody CityDTO cityDTO) {
        CityDTO resCityDTO = cityService.update(cityDTO);
        return ResponseEntity.ok(cityDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        cityService.deleteById(id);
        return ResponseEntity.ok("Delete city with id: "+ id);
    }

    @Override
    @GetMapping("/findAll")
    public ResponseEntity<List<CityDTO>> findAll() {
        List<CityDTO> citiesDTO = cityService.findAll();
        return ResponseEntity.ok(citiesDTO);
    }

    @GetMapping("/findAllByNameCountry/{name}/{country}")
    public ResponseEntity<List<CityDTO>> findAllByNameCountry(@NotEmpty @PathVariable String country,@NotEmpty @PathVariable String name){
        List<CityDTO> citiesDTO = cityService.findAllByNameCountry(name, country);
        return ResponseEntity.ok(citiesDTO);
    }

}
