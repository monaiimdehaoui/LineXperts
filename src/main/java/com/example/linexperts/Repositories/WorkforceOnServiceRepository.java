package com.example.linexperts.Repositories;

import com.example.linexperts.Models.WorkforceOnService;
import com.example.linexperts.Utils.CompositeKeyUtils.WorkforceOnServiceKey;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.*;

public interface WorkforceOnServiceRepository extends CrudRepository<WorkforceOnService, WorkforceOnServiceKey>
{

    //Verify that the contract has services tied to it
    @Query(value = "SELECT COUNT(ser_id) FROM linexpert_schema.vw_wrk_assigned " +
            "WHERE con_id=:conId" , nativeQuery = true)
    Integer fetchNumberOfServicesUnderAContract(@Param("conId") String contractId);

    //Fetch services under a contract with the number of workforce tied to them.
    @Query(value = "SELECT ser_id, ser_name, COUNT(wrk_id) AS workforce_num " +
            "FROM linexpert_schema.vw_wrk_assigned " +
            "WHERE con_id=:conId " +
            "GROUP BY ser_id, ser_name", nativeQuery = true)
    List<String>fetchServiceInfoInAContract(@Param("conId") String contractId);

    //Filter the workforces assigned above by date.
    @Query(value = "SELECT * " +
            "FROM linexpert_schema.workforce_on_service" +
            "  WHERE assigned_date >=:date", nativeQuery = true)
    List<WorkforceOnService>fetchAssignedWorkforcesFilterByDate(@Param("date")Date lowerLimitDate);

    //List the employees working under a contract, filtered per service. Use it
    //As a complement to the fetchServiceInfoInAContract.
    @Query(value = "SELECT con_id, cext_id, wrk_id FROM linexpert_schema.vw_wrk_assigned " +
            "WHERE con_id=:conId AND ser_id=:serId", nativeQuery = true)
    List<String>fetchWorkforceWorkingInAserviceOnASingleContract(@Param("conId") String contractId,
                                                                 @Param("serId") Integer serviceId);


    //Fetch detailed information for services without employees assigned to them.
    @Query(value = "SELECT con_id, ser_id, ser_name FROM linexpert_schema.vw_wrk_assigned" +
            " GROUP BY con_id, ser_id, ser_name " +
            "HAVING COUNT(wrk_id) = 0 AND ser_id IS NOT NULL", nativeQuery = true)
    List<String> fetchServicesWithoutWorkforceAssigned();

}
