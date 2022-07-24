package com.backend.hotel.service.impl;
import com.backend.hotel.dto.CategoryDTO;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Category;
import com.backend.hotel.persistence.repository.ICategoryRepository;
import com.backend.hotel.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;


    @Override
    public CategoryDTO findById(Integer id) {
       Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        return category.toDTO();
    }

    @Override
    public CategoryDTO save(CategoryDTO categoryDTO) {
        Category category = categoryRepository.save(categoryDTO.toEntity());
        return category.toDTO();
    }

    @Override
    public CategoryDTO update(CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(categoryDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryDTO.getId()));
        categoryRepository.save(categoryDTO.toEntity());
        return category.toDTO();
    }

    @Override
    public void deleteById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Category", "id", id));
        categoryRepository.delete(category);
    }

    @Override
    public List<CategoryDTO> findAll() {
        List<Category> categoryList = categoryRepository.findAll();
        return categoryList.stream().map(Category::toDTO).collect(Collectors.toList());
    }
}

