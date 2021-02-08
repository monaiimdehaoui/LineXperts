package com.example.linexperts.Repositories;

import com.example.linexperts.Models.ContractExtension;
import com.example.linexperts.Models.ContractHeader;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface ContractHeaderRepository extends CrudRepository<ContractHeader, String>
{

    //Search by client name. Can be official name or commercial name.
    @Query(value="SELECT clt_commercial_name, clt_official_name, con_id, con_description, con_start_date, " +
            "con_end_date, con_status, group_name " +
            "FROM linexpert_schema.vw_cont_clt_gr_vl WHERE clt_commercial_name " +
            "ILIKE '%'||:name||'%' OR clt_official_name ILIKE '%'||:name||'%'", nativeQuery = true)
    List<String>findContractHeaderByClientName(@Param(value="name") String clientName);

    //Search by client ID.
    List<ContractHeader>findContractHeadersByCltId(String cltId);

    //Search by group name
    @Query(value = "SELECT group_id, group_name, con_id, con_description, con_start_date, con_end_date, con_status, clt_id, " +
            "clt_official_name, clt_commercial_name" +
            " FROM linexpert_schema.vw_cont_clt_gr_vl WHERE group_name ILIKE '%'||:grName||'%'",
            nativeQuery = true)
    List<String>findContractHeadersFromACorporateGroupByName(@Param(value = "grName") String groupName);

    //Search by group id. Can't be of type ContractHeader because the information is incomplete.
    @Query(value = "SELECT group_id, group_name, con_id, con_description, con_start_date, con_end_date, con_status " +
            "FROM linexpert_schema.vw_cont_clt_gr_vl WHERE group_id =:grId", nativeQuery = true)
    List<String>findContractHeadersByCorporateGroupId(@Param(value = "grId") String groupId);

   //List all addendums for a single contract.
    @Query(value = "SELECT con_id, con_status, cext_id, cext_start_date, cext_end_date, cext_status " +
            "FROM linexpert_schema.vw_cont_clt_gr_vl WHERE con_id=:conId", nativeQuery = true)
    List<String>listAddendumsForASingleContract(@Param(value="conId") String contractId);

    //Display a contract's total amount and the invoiced amount (financial information).
    @Query(value="SELECT con_id, clt_commercial_name, clt_official_name, cext_id, cext_total_cost, cext_invoiced_cost"+
            " FROM linexpert_schema.vw_cont_clt_gr_vl WHERE con_id=:conId", nativeQuery = true)
    List<String>displayAContractsFinancialInformation(@Param(value="conId") String contractId);

    //Filter all contracts by status
    List<ContractHeader>findContractHeadersByConStatus(String status);

    //Filter all contracts if they were uploaded to the RUP or not
    List<ContractHeader>findContractHeadersBySentToRup(boolean sentOrNot);
}
