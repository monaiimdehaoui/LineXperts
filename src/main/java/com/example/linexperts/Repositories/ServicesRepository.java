package com.example.linexperts.Repositories;

import com.example.linexperts.Models.Services;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServicesRepository extends CrudRepository<Services, Integer> {

    //Find by name like. Ex: 'Co' returns COBOL and Accounting.
    @Query(value="SELECT * FROM linexpert_schema.service WHERE ser_name ILIKE '%'||:name||'%'", nativeQuery = true)
    List<Services> findServicesByServiceNameLike(String name);

    Optional<Services> findServicesBySerNameIgnoreCase(String name); //Used in controller to impede accidental updates.

    Services findServicesBySerNameContains(String name); //returns only one. Used for testing purposes.

    //Only used for testing purposes.
    @Query(value = "DELETE FROM linexpert_schema.service" +
            " WHERE ser_name ILIKE '%'||:test||'%'", nativeQuery = true)
    @Modifying
    @Transactional
    Integer deleteBySerName(@Param("test") String testName);

}
