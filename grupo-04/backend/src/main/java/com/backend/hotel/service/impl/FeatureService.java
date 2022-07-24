package com.backend.hotel.service.impl;
import com.backend.hotel.dto.FeatureDTO;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Feature;
import com.backend.hotel.persistence.repository.IFeatureRepository;
import com.backend.hotel.service.IFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeatureService implements IFeatureService {

    @Autowired
    private IFeatureRepository featureRepository;

    @Override
    public FeatureDTO findById(Integer id) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Feature","id",id));
        return feature.toDTO();
    }

    @Override
    public FeatureDTO save(FeatureDTO featureDTO) {
        Feature feature = featureRepository.save(featureDTO.toEntity());
        return feature.toDTO();
    }

    @Override
    public FeatureDTO update(FeatureDTO featureDTO) {
        Feature feature = featureRepository.findById(featureDTO.getId())
                .orElseThrow(()-> new ResourceNotFoundException("Feature","id",featureDTO.getId()));
        featureRepository.save(feature);
        return feature.toDTO();
    }

    @Override
    public void deleteById(Integer id) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Feature","id",id));
        featureRepository.delete(feature);
    }

    @Override
    public List<FeatureDTO> findAll() {
        List<Feature> features = featureRepository.findAll();
        List<FeatureDTO> featuresDTO = new ArrayList<>();
        for(Feature f : features){
            featuresDTO.add(f.toDTO());
        }
        return featuresDTO;
    }
}
