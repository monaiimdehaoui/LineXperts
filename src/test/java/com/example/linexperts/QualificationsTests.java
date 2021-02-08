package com.example.linexperts;

import com.example.linexperts.Models.Workforce;
import com.example.linexperts.Models.WorkforceQualifications;
import com.example.linexperts.Repositories.WorkforceQualificationsRepository;
import org.junit.jupiter.api.Test;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class QualificationsTests {

    @Autowired
    private WorkforceQualificationsRepository qualificationsRepository;

    @Test
    public void getAllRecords() {
        List<WorkforceQualifications> allQualifications = (List<WorkforceQualifications>) qualificationsRepository.findAll();
        assertEquals(21, allQualifications.size());
    }

    @Test
    public void getWorkforceInfoByQualification()
    {
        List<String> qualifiedWorkforce = qualificationsRepository.findAllQualifiedEmployees("Business Intelligence");

        assertEquals(5, qualifiedWorkforce.size());
    }

    @Test
    public void getAllWorkforcesForASpecificService()
    {
        List<WorkforceQualifications> allworkforceForThisService = qualificationsRepository.findWorkforceQualificationsBySerIdIs(1);

        assertEquals(3, allworkforceForThisService.size());
    }

    @Test
    public void getServicesWithActiveWorkforces()
    {
        List<String> availableWorkforce  = qualificationsRepository.findServicesWithActiveWorkforce();

        assertEquals(6, availableWorkforce.size());
    }

    //Updating in this table is pointless. Deleting is not.
    @Test
    public void insertingTestRecordThenDeletingIt()
    {
        WorkforceQualifications youdonegoofed = new WorkforceQualifications();
        youdonegoofed.setWrkId("WORKF-9-999989998888");
        youdonegoofed.setSerId(4);
        qualificationsRepository.save(youdonegoofed);

        assertEquals(4, youdonegoofed.getSerId());
        qualificationsRepository.delete(youdonegoofed);
    }
}
