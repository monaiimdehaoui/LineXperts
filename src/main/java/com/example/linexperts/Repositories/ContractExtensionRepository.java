package com.example.linexperts.Repositories;

import com.example.linexperts.Models.ContractExtension;
import com.example.linexperts.Utils.CompositeKeyUtils.ContractExtensionKey;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

public interface ContractExtensionRepository extends CrudRepository<ContractExtension, ContractExtensionKey> {

    //Update: closure-date,status, invoiced-cost

    @Query(value = "SELECT group_id, group_name, " +
            " cext_id, cext_status, cext_start_date, cext_end_date, cext_total_cost, cext_invoiced_cost " +
            "FROM linexpert_schema.vw_cont_clt_gr_vl " +
            "WHERE group_id=:grId" , nativeQuery = true)
    List<String>findContractExtensionsOfAGroup(@Param("grId") String groupId);

    @Query(value = "SELECT clt_id, clt_commercial_name, clt_official_name,"
            + " cext_id, cext_status, cext_start_date, cext_end_date, cext_total_cost, cext_invoiced_cost " +
            "FROM linexpert_schema.vw_cont_clt_gr_vl " +
            "WHERE clt_id=:clId", nativeQuery = true)
    List<String>findContractExtensionsByClientId(@Param("clId") String clientId);

    @Query(value="SELECT group_id, group_name, clt_id, clt_commercial_name, clt_official_name,"
            + " cext_id, cext_status, cext_start_date, cext_end_date, cext_total_cost, cext_invoiced_cost " +
            "FROM linexpert_schema.vw_cont_clt_gr_vl " +
            "WHERE clt_official_name=:name OR clt_commercial_name=:name",
            nativeQuery = true)
    List<String>findContractExtensionsByClientName(@Param("name") String clientName);


    @Query(value = "SELECT clt_id, clt_commercial_name, clt_official_name,"
            + " cext_id, cext_start_date, cext_end_date, cext_total_cost, cext_invoiced_cost " +
            "FROM linexpert_schema.vw_cont_clt_gr_vl " +
            "WHERE clt_id=:clId AND cext_status=:status", nativeQuery = true)
    List<String>filterAClientsExtensionsByStatus(@Param("clId") String clientId, @Param("status") String status);

}
