package com.backend.hotel.controller;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.persistence.entity.Product;
import com.backend.hotel.service.impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/product")
@Transactional

public class ProductController implements ICRUDController<ProductDTO>{

    @Autowired
    private ProductService productService;

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> findById(@PathVariable("id") Integer id) {
        ProductDTO productDTO = productService.findById(id);
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO productDTO) {

        return new ResponseEntity<>(productService.save(productDTO), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/update")
    public ResponseEntity<ProductDTO> update(@RequestBody ProductDTO productDTO) {
        return new ResponseEntity<>(productService.update(productDTO), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id) {
        productService.deleteById(id);
        return new ResponseEntity<>("Delete success", HttpStatus.OK);
    }

    @Override
    @GetMapping("/findAll")
    public ResponseEntity<List<ProductDTO>> findAll() {
        return new ResponseEntity<>(productService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/findByAll")
    public ResponseEntity<List<ProductDTO>> findByAllOther(
            @RequestParam(value = "categoryId", defaultValue = "0", required = false) Integer categoryId,
            @RequestParam(value = "cityId", defaultValue = "0", required = false) Integer cityId,
            @RequestParam(value = "checkIn", defaultValue = "2012-12-12", required = false) String checkIn,
            @RequestParam(value = "checkOut",defaultValue = "2012-12-12", required = false) String checkOut,
            @RequestParam(value = "cant",defaultValue = "6", required = false) Integer cant,
            @RequestParam(value = "pag",defaultValue = "0", required = false) Integer pag){

        return new ResponseEntity<>(productService.findAllByCategoryAndCityAndBetweenDate(categoryId, cityId, LocalDate.parse(checkIn), LocalDate.parse(checkOut), cant, pag), HttpStatus.OK);
    }

    @GetMapping("/findAll/category/{category}")
    public ResponseEntity<List<ProductDTO>> findAllByCategory(@PathVariable("category") String category){
        return new ResponseEntity<>(productService.findAllByCategory(category), HttpStatus.OK);
    }

    @GetMapping("/findAll/categoryId/{id}")
    public ResponseEntity<List<ProductDTO>> findAllByCategory(@PathVariable("id") Integer id){
        return new ResponseEntity<>(productService.findAllByCategoryId(id), HttpStatus.OK);
    }

    @GetMapping("/findAll/city/{city}")
    public ResponseEntity<List<ProductDTO>> findAllByCity(@PathVariable("city") String city){
        return new ResponseEntity<>(productService.findAllByCity(city), HttpStatus.OK);
    }

    @GetMapping("findAll/city/id/{id}")
    public ResponseEntity<List<ProductDTO>> findAllByCityId(@PathVariable("id") Integer id){
        return new ResponseEntity<>(productService.findAllByCityId(id), HttpStatus.OK);
    }

    @GetMapping("findAll/random")
    public ResponseEntity<List<ProductDTO>> findAllRandom(){
        return new ResponseEntity<>(productService.getRandomProduct(), HttpStatus.OK);
    }

    @GetMapping("/findByPages")
    public ResponseEntity<List<ProductDTO>> findAllPages(
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "4",required = false) int pageSize
    ){
        return new ResponseEntity<>(productService.findAllByPages(pageNumber, pageSize), HttpStatus.OK);
    }

    //----------------------PROCEDURE-------------------------------------
    @GetMapping("/findAll/procedure")
    public ResponseEntity<List<Product>> findAllProcedure(){
        return new ResponseEntity<>(productService.findAllProcedure(), HttpStatus.OK);
    }

    //----------------------Filtrar por fechas ---------------------------------
    @GetMapping("/findByDate/{startDate}/{endDate}")
    public ResponseEntity<List<ProductDTO>> findAllBetweenDates(@PathVariable("startDate") String startDate, @PathVariable("endDate") String endDate){
       return new ResponseEntity<>(productService.findAllBetweenDates( LocalDate.parse(startDate) ,LocalDate.parse(endDate)), HttpStatus.OK);
    }

}
