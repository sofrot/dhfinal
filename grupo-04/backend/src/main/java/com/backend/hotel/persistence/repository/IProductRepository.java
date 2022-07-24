package com.backend.hotel.persistence.repository;
import com.backend.hotel.persistence.entity.City;
import com.backend.hotel.persistence.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByCategory_Title(String title);
    List<Product> findByCategory_Id(Integer id);
    List<Product> findByCity_Name(String city);
    List<Product> findByCity_Id(Integer id);
    //get random product - SELECT column FROM table ORDER BY RAND() LIMIT 5
    @Query(value = "SELECT * FROM products ORDER BY RAND() LIMIT 6", nativeQuery = true)
    List<Product> getRandomProduct();

    @Query(value = "select * from products where category_id like :category and city_id like :city",nativeQuery = true)
    List<Product> findByCategoryCity(@Param("category") String category, @Param("city") String city);

    @Query(value = "CALL sp_filter_by_date_city_category(:category_id, :city_id ,:date_in, :date_out, :cant, :offset)", nativeQuery = true)
    List<Product> findAllByCategoryAndCityAndBetweenDate(@Param("category_id") Integer category_id, @Param("city_id") Integer city_id, @Param("date_in") LocalDate date_in,@Param("date_out") LocalDate date_out ,@Param("cant") Integer cant, @Param("offset") Integer offset);

    //llamar procedure
    @Query(value = "call list_procedure", nativeQuery = true)
    List<Product> listProcedure();

    //procedure para traer score
    @Procedure(procedureName = "findProductAndScore")
    List<Product> findProductAndScore();
}
