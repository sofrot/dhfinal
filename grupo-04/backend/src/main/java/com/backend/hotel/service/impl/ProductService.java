package com.backend.hotel.service.impl;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.dto.ReservationDTO;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Product;
import com.backend.hotel.persistence.entity.Reservation;
import com.backend.hotel.persistence.repository.IProductRepository;
import com.backend.hotel.service.IProductService;
import com.backend.hotel.service.IReservationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IReservationService reservationService;

    @Override
    public ProductDTO findById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Product","id",id));
        if (product.getScore() == null){
            product.setScore(0.0);
        }
        return product.toDTO();
    }

    @Override
    public ProductDTO save(ProductDTO productDTO) {
        Product product = productRepository.save(productDTO.toEntity());
        if (product.getScore() == null){
            product.setScore(0.0);
        }
        return product.toDTO();
    }

    @Override
    public ProductDTO update(ProductDTO productDTO) {
        Product product = productRepository.findById(productDTO.getId())
                .orElseThrow(()-> new ResourceNotFoundException("Product","id",productDTO.getId()));
        productRepository.save(productDTO.toEntity());
        if (product.getScore() == null){
            product.setScore(0.0);
        }
        return product.toDTO();
    }

    @Override
    public void deleteById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Product","id",id));
        productRepository.delete(product);
    }

    @Override
    public List<ProductDTO> findAll() {
        //List<Product> productAndScore = productRepository.findProductAndScore();
        List<Product> products = productRepository.findProductAndScore();
        List<ProductDTO> productsDTO = new ArrayList<>();
        for(Product p : products){
            if (p.getScore() == null){
                p.setScore(0.0);
            }
            productsDTO.add(p.toDTO());
        }
        return productsDTO;
    }

    //---------------------Filtrar por nombre categoria--------------------
    @Override
    public List<ProductDTO> findAllByCategory(String category) {
        List<Product> productList = productRepository.findByCategory_Title(category);
        return productList.stream().map(product -> product.toDTO()).collect(Collectors.toList());
    }

    //---------------------Filtrar por id categoria--------------------
    @Override
    public List<ProductDTO> findAllByCategoryId(Integer categoryId) {
        List<Product> productList = productRepository.findByCategory_Id(categoryId);
        return  productList.stream().map(product -> product.toDTO()).collect(Collectors.toList());
    }

    //--------------------Filtrar por nombre ciudad-------------------------
    @Override
    public List<ProductDTO> findAllByCity(String city) {
        List<Product> productList = productRepository.findByCity_Name(city);
        return productList.stream().map(product -> product.toDTO()).collect(Collectors.toList());
    }

    //--------------------Filtrar por id ciudad-------------------------
    @Override
    public List<ProductDTO> findAllByCityId(Integer id) {
        List<Product> productList = productRepository.findByCity_Id(id);
        return productList.stream().map(product -> product.toDTO()).collect(Collectors.toList());
    }

    //--------------------Traer productos aleatorios----------------------
    @Override
    public List<ProductDTO> getRandomProduct() {
        List<Product> productList = productRepository.getRandomProduct();
        return productList.stream().map(product -> product.toDTO()).collect(Collectors.toList());
    }


    //--------------------- Paginacion ---------------------------
    @Override
    public List<ProductDTO> findAllByPages(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Product> products = productRepository.findAll(pageable);
        List<Product> productsList = products.getContent();
        return productsList.stream().map(product -> product.toDTO()).collect(Collectors.toList());
    }

    //--------------------- PROCEDURE ---------------------------------
    public List<Product> findAllProcedure(){
        return productRepository.listProcedure();
    }

    //--------------------filtrar por categoria y ciudad y fecha ----------------------

    public List<ProductDTO> findAllByCategoryAndCityAndBetweenDate(Integer categoryId, Integer cityId, LocalDate checkIn, LocalDate checkOut, Integer cant, Integer pag ){
        List<Product> products = productRepository.findAllByCategoryAndCityAndBetweenDate(categoryId,cityId,checkIn,checkOut,cant, (cant*pag));
        Collections.shuffle(products);
        List<Product> randProducts = products.subList(0,products.size());
        return randProducts.stream().map(product -> product.toDTO()).collect(Collectors.toList());
    }

    //----------------------FILTRAR PRODUCTO POR FECHA ---------------------
    @Override
    public List<ProductDTO> findAllBetweenDates(LocalDate startDate, LocalDate endDate){
        List<ReservationDTO> reservationList = reservationService.findAll();
        List<ReservationDTO> reservationListTaken = reservationList.stream()
                .filter(reservation -> reservation.getCheckIn().isAfter(startDate) && reservation.getCheckOut().isBefore(endDate)).collect(Collectors.toList());
        List<ProductDTO> productDTOList = new ArrayList<>();
        for(ReservationDTO reservation : reservationListTaken){
            productDTOList.add(findById(reservation.getId()));
        }
        List<ProductDTO> productDTOListFree = findAll();
        productDTOListFree.removeAll(productDTOList);
        return productDTOListFree;
    }
}
