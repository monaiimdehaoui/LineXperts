package com.example.linexperts.Repositories;

import com.example.linexperts.Models.Services;
import com.example.linexperts.Models.Workforce;
import com.example.linexperts.Models.WorkforceQualifications;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

public interface WorkforceQualificationsRepository extends CrudRepository<WorkforceQualifications, String>
{

    @Query(value="SELECT ser_id FROM linexpert_schema.workforce_qualification" +
            " WHERE wrk_id=:wrkId", nativeQuery = true)
    List<Integer> findServicesQualifiedEmployeesByServiceId(@Param("wrkId") String workId);

    //find services for which employees are qualified for regardless of status.
    @Query(value = "SELECT wrk_id, wrk_last_name, wrk_sec_last_name, " +
            "wrk_first_name, wrk_mid_name, wrk_status FROM linexpert_schema.vw_wrk_qualif " +
            "WHERE ser_name ILIKE :serviceName", nativeQuery = true)
    List<String> findAllQualifiedEmployees(@Param("serviceName") String servName);

    //Using views to make my life easier. Linking the rest of the entities will be too hard.
    @Query(value="SELECT ser_name, COUNT(wrk_id) FILTER (WHERE wrk_status='En Labor') AS Numero_de_recursos_activos \n" +
            "FROM linexpert_schema.vw_wrk_qualif\n" +
            "GROUP BY ser_name\n" +
            "HAVING COUNT(wrk_id) > 0\n" +
            "ORDER BY ser_name ASC;", nativeQuery = true)
    List<String>findServicesWithActiveWorkforce();

    //Normal Crud Operations. Update not included because it's pointless. Delete is already part of the
    //undeclared operations of this repo.
    List<WorkforceQualifications> findWorkforceQualificationsBySerIdIs(int serviceId);

    @Query(value="SELECT ser_id FROM linexpert_schema.workforce_qualification " +
            "WHERE wrk_id=:wrkid", nativeQuery = true)
    ArrayList<Integer>findServicesForWorkforce(@Param("wrkid") String wrkId);

    void deleteWorkforceQualificationsBySerIdAndWrkId(int serId, String wrkId);

}
