package com.example.linexperts.Repositories;

import com.example.linexperts.Models.Client;
import com.example.linexperts.Models.CorporateGroup;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

public interface ClientRepository extends CrudRepository<Client, String> {

    //Find by name
    @Query(value="SELECT * FROM linexpert_schema.client " +
            "WHERE clt_commercial_name ILIKE '%'||:name||'%'", nativeQuery = true)
    List<Client> findByName(@Param(value="name") String name);

    //List group information for a client. Uses client ID.
    @Query(value = "SELECT group_id, group_name, group_status FROM linexpert_schema.vw_client_group" +
            " WHERE clt_id=:clientId", nativeQuery = true)
    List<String> fetchGroupInfoForClient(@Param(value="clientId") String cltId);

    List<Client>findClientsByCltStatusIs(String status);

    @Modifying
    @Transactional
    void deleteClientsByCltIdContains(String cltId);


}
