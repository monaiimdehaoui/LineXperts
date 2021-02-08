package com.example.linexperts.Repositories;

import com.example.linexperts.Models.CorporateGroup;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CorporateGroupRepository extends CrudRepository<CorporateGroup, String>
{

    //Find by name like. Ex: 'er' returns Alqueria and Synergy Group.
    @Query(value = "SELECT * FROM linexpert_schema.corporate_group WHERE group_name ILIKE '%'||:name||'%'", nativeQuery = true)
    List<CorporateGroup> findByName(@Param("name") String name);

    @Query(value = "SELECT group_id, group_name, clt_id, clt_official_name, clt_commercial_name " +
            "FROM linexpert_schema.vw_client_group WHERE group_name ILIKE '%'||:name||'%'",
            nativeQuery = true)
    List<String> getAllClientsOfAgroup(@Param("name") String grpName);

    //Filter corporate groups by status
    List<CorporateGroup>getCorporateGroupByGroupStatusIsIgnoreCase(String status);

    //The following methods will be for report generation
    @Modifying
    @Transactional
    void deleteCorporateGroupsByGroupIdContains(String corpId);
}
