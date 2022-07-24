package com.backend.hotel.controller;
import com.backend.hotel.dto.CategoryDTO;
import com.backend.hotel.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")

public class CategoryController implements ICRUDController<CategoryDTO> {

    @Autowired
    private ICategoryService categoryService;

    @Override
    @GetMapping("/find/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable Integer id) {
        return new ResponseEntity<>(categoryService.findById(id), HttpStatus.OK);
    }

    @Override
    @PostMapping("/create")
    public ResponseEntity<CategoryDTO> create(@RequestBody CategoryDTO categoryDTO) {
        return new ResponseEntity<>(categoryService.save(categoryDTO), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/update")
    public ResponseEntity<CategoryDTO> update(@RequestBody CategoryDTO categoryDTO) {
        return new ResponseEntity<>(categoryService.update(categoryDTO), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        categoryService.deleteById(id);
        return new ResponseEntity<>("Deleted category with id: " + id, HttpStatus.OK);
    }

    @Override
    @GetMapping("/findAll")
    public ResponseEntity<List<CategoryDTO>> findAll() {
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }
}
