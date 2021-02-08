package com.example.linexperts.Repositories;

import com.example.linexperts.Models.ServiceByContract;
import com.example.linexperts.Utils.CompositeKeyUtils.ServiceByContractKey;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.*;

public interface ServiceByContractRepository extends CrudRepository<ServiceByContract, ServiceByContractKey>
{

    //Listado de servicios por contrato, incluye numero de otrosi. Filtrados por fecha
    @Query(value = "SELECT con_id, cext_id, ser_id, ser_name, ser_start_date " +
            "FROM linexpert_schema.vw_ser_cont_detail " +
            "WHERE con_id=:conId AND ser_start_date >=:date", nativeQuery = true)
    List<String>findServicesUnderAContractByStartDate(@Param("conId") String contractId,
                                                      @Param("date") Date startDate);

    //Mirar servicios por contrato, incluye numero de otrosi.
    @Query(value = "SELECT con_id, cext_id, ser_id, ser_name, ser_start_date " +
            "FROM linexpert_schema.vw_ser_cont_detail " +
            "WHERE con_id=:conId", nativeQuery = true)
    List<String>viewServicesUnderAContract(@Param("conId") String contractId);

    //Servicio en que contrato - Por Id
    @Query(value="SELECT con_id, cext_id, ser_id, ser_name, con_start_date, ser_start_date " +
            "FROM linexpert_schema.vw_ser_cont_detail " +
            "WHERE ser_id=:serId " +
            "ORDER BY con_start_date DESC," +
            "group_name ASC;", nativeQuery = true)
    List<String>viewOneServiceAcrossContracts(@Param("serId") Integer serviceId);

    //Servicio en que contrato - Por Nombre
    @Query(value="SELECT con_id, cext_id, ser_id, ser_name, con_start_date, ser_start_date " +
            "FROM linexpert_schema.vw_ser_cont_detail " +
            "WHERE ser_name=:serName " +
            "ORDER BY con_start_date DESC," +
            "group_name ASC;", nativeQuery = true)
    List<String>viewOneServiceAcrossContractsSearchName(@Param("serName") String serviceName);

    //Que servicios a contratado un cliente
    @Query(value="SELECT clt_id, clt_official_name, clt_commercial_name, cext_id, ser_id, ser_name, ser_start_date, ser_end_date " +
            "FROM linexpert_schema.vw_ser_cont_detail " +
            "WHERE clt_id =:cltId", nativeQuery = true)
    List<String> viewServicesContractedByAClient(@Param("cltId") String clientId);

    //Filtrar servicios por estado del contrato.
    @Query(value="SELECT linexpert_schema.vw_ser_cont_detail.con_id, linexpert_schema.vw_ser_cont_detail.group_id, " +
            "linexpert_schema.vw_ser_cont_detail.group_name, linexpert_schema.vw_ser_cont_detail.clt_id, " +
            "linexpert_schema.vw_ser_cont_detail.clt_commercial_name, ser_id, ser_name, " +
            "linexpert_schema.vw_ser_cont_detail.con_start_date, con_status " +
            "FROM linexpert_schema.vw_ser_cont_detail " +
            "INNER JOIN linexpert_schema.vw_cont_clt_gr_vl " +
            "ON linexpert_schema.vw_cont_clt_gr_vl.con_id = linexpert_schema.vw_ser_cont_detail.con_id " +
            "WHERE ser_id=:serid AND con_status=:status " +
            "ORDER BY con_start_date DESC, group_name ASC;", nativeQuery = true)
    List<String> filterServicesByContractStatus(@Param("serid") Integer serviceId,
                                                @Param("status") String contractStatus);


    @Query(value = "SELECT con_id, cext_id FROM linexpert_schema.vw_wrk_assigned " +
            "WHERE ser_id IS NULL", nativeQuery = true)
    List<String> findContractsWithNoServices();


}
