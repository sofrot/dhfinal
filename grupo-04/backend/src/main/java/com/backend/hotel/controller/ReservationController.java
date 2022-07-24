package com.backend.hotel.controller;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.dto.ReservationDTO;
import com.backend.hotel.persistence.repository.IUserRepository;
import com.backend.hotel.service.impl.ProductService;
import com.backend.hotel.service.impl.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/api/reservation")
@Transactional
public class ReservationController implements ICRUDController<ReservationDTO> {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private ProductService productService;

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> findById(@PathVariable("id") Integer id) {
        ReservationDTO reservationDTO = reservationService.findById(id);
        return new ResponseEntity<>(reservationDTO, HttpStatus.OK);
    }

    @Override
    @PostMapping("/create")
    public ResponseEntity<ReservationDTO> create(@RequestBody ReservationDTO reservationDTO) throws MessagingException, UnsupportedEncodingException {
        ReservationDTO reservationData = reservationService.save(reservationDTO);
        ProductDTO productData = productService.findById(reservationDTO.getProduct().getId());
        String urlBack = System.getenv().get("URL_API_BACKEND");
        String url = urlBack+"/api/reservation";
        //String url = System.getenv().get("APP_FRONT");
        reservationService.sendReservationEmail(reservationData, url, productData);
        return new ResponseEntity<>(reservationData, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/update")
    public ResponseEntity<ReservationDTO> update(@RequestBody ReservationDTO reservationDTO) {
        return new ResponseEntity<>(reservationService.update(reservationDTO), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id) {
        reservationService.deleteById(id);
        return new ResponseEntity<>("Delete success", HttpStatus.OK);
    }

    @Override
    @GetMapping("/findAll")
    public ResponseEntity<List<ReservationDTO>> findAll() {
        return new ResponseEntity<>(reservationService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/findAll/product/{id}")
    public ResponseEntity<List<ReservationDTO>> findAllByProductId(@PathVariable("id") Integer id){
        return new ResponseEntity<>(reservationService.findAllByProductId(id), HttpStatus.OK);
    }

    @GetMapping("/findAll/user/{id}")
    public ResponseEntity<List<ReservationDTO>> findAllByUserId(@PathVariable("id") Integer id){
        return new ResponseEntity<>(reservationService.findAllByUserId(id), HttpStatus.OK);
    }

}
