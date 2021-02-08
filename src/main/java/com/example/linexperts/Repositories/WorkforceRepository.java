package com.example.linexperts.Repositories;

import com.example.linexperts.Models.Workforce;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface WorkforceRepository extends CrudRepository<Workforce, String>
{

    //search by last name. Has to be custom query.
    @Query(value="SELECT * FROM linexpert_schema.workforce WHERE wrk_sec_last_name ILIKE '%'||:lastnames||'%' " +
            "OR wrk_last_name ILIKE '%'||:lastnames||'%'" +
            " ORDER BY wrk_id",nativeQuery = true)
    List<Workforce>findByLastNames(@Param("lastnames") String lastname);

    @Query(value="SELECT * FROM linexpert_schema.workforce WHERE wrk_mid_name ILIKE '%'||:name||'%'" +
            " OR wrk_first_name ILIKE '%'||:name||'%'",
            nativeQuery = true)
    List<Workforce> findWorkforcesByMiddleOrFirstname(@Param("name")String name);



    @Modifying
    @Transactional
    void deleteWorkforceByWrkIdContains(String testId);

    List<Workforce>findAllByWrkIdContains(String id);


}