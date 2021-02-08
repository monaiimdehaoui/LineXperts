package com.example.linexperts;

import com.example.linexperts.Models.WorkforceOnService;
import com.example.linexperts.Repositories.WorkforceOnServiceRepository;
import com.example.linexperts.Utils.CompositeKeyUtils.WorkforceOnServiceKey;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;
import java.sql.Date;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WorkforceOnServiceTests {

    @Autowired
    private WorkforceOnServiceRepository wosRepository;

    @Test
    public void findAll()
    {
        List<WorkforceOnService> allWoS = (List<WorkforceOnService>) wosRepository.findAll();

        assertEquals(30, allWoS.size());
    }

    @Test
    public void findARecord()
    {
        String dateAsString = "2018-06-20";
        Optional<WorkforceOnService> foundWoS = wosRepository.findById(new WorkforceOnServiceKey("CONTRACT-10-268-552-245",
                "CONTR-EXT-10-231-1231-23", 4, "WORKF-3-001612032022"));

        assertEquals(Date.valueOf(dateAsString), foundWoS.get().getAssignedDate());
    }

    @Test
    public void countServicesUnderContract()
    {
        Integer servicesUnderContract = wosRepository
                .fetchNumberOfServicesUnderAContract("CONTRACT-10-268-552-245");

        assertEquals(14, servicesUnderContract);
    }

    @Test
    public void countWorkforcesUnderContract()
    {
        List<String> countOfWorkforcePerService = wosRepository
                .fetchServiceInfoInAContract("CONTRACT-10-268-552-245");

        assertEquals(6, countOfWorkforcePerService.size());
    }

    @Test
    public void findWorkforcesWithServicesAssignedByDate()
    {
        List<WorkforceOnService> wosFilteredByDate = wosRepository
                .fetchAssignedWorkforcesFilterByDate(Date.valueOf("2020-02-01"));

        assertEquals(6, wosFilteredByDate.size());
    }

    @Test
    public void findWorkforceWithinAServiceInAContract()
    {
            List<String> workforceList = wosRepository
                    .fetchWorkforceWorkingInAserviceOnASingleContract
                            ("CONTRACT-10-268-552-245",4);

            assertEquals(2, workforceList.size());
    }

    @Test
    public void findServicesWithNoWorkforces()
    {
            List<String> servicesWithoutWorkforce = wosRepository.fetchServicesWithoutWorkforceAssigned();

            assertEquals(0, servicesWithoutWorkforce.size());
    }

    @Test
    public void addNewAssignedWorkforceThenDeleteIt()
    {
        WorkforceOnService testWoS = new WorkforceOnService("CONTRACT-10-268-552-245",
                "CONTR-EXT-6-231-1231-23", 4, "WORKF-1-481468446844",
                Date.valueOf("2021-02-22"), Date.valueOf("2021-02-23"),
                Date.valueOf("2021-02-24"));

        wosRepository.save(testWoS);

        assertEquals(Date.valueOf("2021-02-22"), wosRepository
                .findById(new WorkforceOnServiceKey("CONTRACT-10-268-552-245", "CONTR-EXT-6-231-1231-23",
                        4, "WORKF-1-481468446844")).get().getAssignedDate());

        wosRepository.delete(testWoS);
    }



}
