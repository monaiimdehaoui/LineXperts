package com.example.linexperts;

import com.example.linexperts.Models.CorporateGroup;
import com.example.linexperts.Repositories.CorporateGroupRepository;
import org.junit.jupiter.api.Test;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CorporateGroupTests {

    @Autowired
    CorporateGroupRepository corporateGroupRepository;

    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job corpGroupJob;

    @Test
    public void findAllCorporateGroups()
    {
        List<CorporateGroup> existingGroups
                = (List<CorporateGroup>) corporateGroupRepository.findAll();

        assertEquals(10, existingGroups.size());
    }

    @Test
    public void findCorporateGroupById()
    {
        Optional<CorporateGroup> foundById = corporateGroupRepository.findById("CORP TURJR-4-428454");

        assertEquals("Premier Venture Investment", foundById.get().getGroupName());
    }

    @Test
    public void insertNewCorporateGroupThenDelete()
    {
        CorporateGroup newGroup = new CorporateGroup("CORP TEST-4-428454","Testing",
                "ExampleAddressT","Wrens","Georgia","United States",
                "+57-318-5555-077","drolsky344@verizon.net", "NIT- NUM. DE IDENTIF. TRIBUTARIA",
                "Activo");

        corporateGroupRepository.save(newGroup);

        Optional<CorporateGroup> checkIfInserted = corporateGroupRepository.findById("CORP TEST-4-428454");

        assertEquals(true, checkIfInserted.isPresent());

        corporateGroupRepository.delete(newGroup);

    }

    @Test
    public void insertNewCorporateGroupUpdateItThenDelete()
    {
        CorporateGroup newGroup = new CorporateGroup("CORP TEST-4-428454","Testing",
                "ExampleAddressT","Wrens","Georgia","United States",
                "+57-318-5555-077","drolsky344@verizon.net", "NIT- NUM. DE IDENTIF. TRIBUTARIA",
                "Activo");

        corporateGroupRepository.save(newGroup);

        newGroup.setGroupStatus("Inactivo");
        corporateGroupRepository.save(newGroup);

        assertEquals("Inactivo", newGroup.getGroupStatus());

        corporateGroupRepository.delete(newGroup);
    }

    @Test
    public void testCustomSearchMethodInRepo_FindByName()
    {
        List<CorporateGroup> groupsByEr = corporateGroupRepository.findByName("er");
        assertEquals(3, groupsByEr.size());

    }

    @Test
    public void testCustomSearchMethodInRepo_getClientsOfAgroup()
    {
        List<String> clientsUnderVertigoGroup = corporateGroupRepository
                .getAllClientsOfAgroup("Vertigo Security Systems");

        assertEquals(2, clientsUnderVertigoGroup.size());
    }

    @Test
    public void testCSVHandling() throws Exception
    {
        Map<String, JobParameter> maps = new HashMap<>();
        maps.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters paramaters = new JobParameters(maps);
        JobExecution jobExecution = jobLauncher.run(corpGroupJob, paramaters);

        assertEquals("COMPLETED", jobExecution.getStatus().name());

        corporateGroupRepository.deleteCorporateGroupsByGroupIdContains("CORP TEST");
    }

    @Test
    public void searchGroupsByStatus()
    {
        List<CorporateGroup> activeGroups = corporateGroupRepository
                .getCorporateGroupByGroupStatusIsIgnoreCase("activo");

        assertEquals(9, activeGroups.size());
    }
}
