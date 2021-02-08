package com.example.linexperts;

import com.example.linexperts.Models.Workforce;
import com.example.linexperts.Repositories.WorkforceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WorkforceTests {

    @Autowired
    private WorkforceRepository workforceRepository;

    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job workforceJob;


    @Test
    public void findsAllWorkforces()
    {
        List<Workforce> allRecords = (List<Workforce>) workforceRepository.findAll();
        assertEquals(11, allRecords.size());

    }
    @Test
    public void testFindWorkforceById()
    {
        Optional<Workforce> workforce = workforceRepository.findById("WORKF-7-417415417547");
        assertNotNull(workforce);
    }

    @Test
    @Transactional
    public void testCreationAndDeletion()
    {
        Workforce nothinPersonelKid = new Workforce();
        nothinPersonelKid.setWrkId("Fatality");
        nothinPersonelKid.setWrkAddress("On The HIIGHWAY TO HELL");
        nothinPersonelKid.setWrkCellNo("133-back-inBlack");
        nothinPersonelKid.setWrkCity("Hell");
        nothinPersonelKid.setWrkCountry("AC/DC");
        nothinPersonelKid.setWrkCorpEmail("back.in.black@gmail.com");
        nothinPersonelKid.setWrkFirstName("nothing");
        nothinPersonelKid.setWrkSecLastName("kid");
        nothinPersonelKid.setWrkSecLastName("...");
        nothinPersonelKid.setWrkMidName("personal");
        nothinPersonelKid.setWrkPhoneNo("123-gonna-liveFast");
        nothinPersonelKid.setWrkRegion("THUNDERSTRUCK");
        nothinPersonelKid.setWrkStatus("En Labor");

        workforceRepository.save(nothinPersonelKid);

        Optional<Workforce> findTheNonsense = workforceRepository.findById(nothinPersonelKid.getWrkId());
        assertEquals("Hell", findTheNonsense.get().getWrkCity());

        workforceRepository.deleteById(nothinPersonelKid.getWrkId());
    }

    @Test
    public void insertOrUpdateRecordsFromCsvFile() throws Exception {
        Map<String, JobParameter> maps = new HashMap<>();
        maps.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters paramaters = new JobParameters(maps);
        JobExecution jobExecution = jobLauncher.run(workforceJob, paramaters);

        assertEquals("COMPLETED", jobExecution.getStatus().name());

        workforceRepository.deleteWorkforceByWrkIdContains("WORKF-T");
    }

    @Test
    public void createNewWorkforceFindThemByLastNamesThenDelete()
    {
        Workforce testingSearch1 = new Workforce("testing1","O'Toole", "Langley","Natasha", "",
                "123-344-1111", "223-111-4555", "natasha_oToole@linexperts.com", "En Labor",
                "5th Boulevard, 12th Street", "Toronto", "Ontario", "Canada");

        workforceRepository.save(testingSearch1);

        List<Workforce> searchByLastName = workforceRepository.findByLastNames("oo");

        assertEquals(1, searchByLastName.size());

        workforceRepository.delete(testingSearch1);

    }

    @Test
    public void createNewListOfWorkforceFindThemByFirstNamesThenDelete()
    {
        Workforce testingFnSearch1 = new Workforce("testing1","Turgenev", "","Zhenka", "",
                "123-344-1111", "223-111-4555", "zhenka_Turgenev@linexperts.com", "En Labor",
                "5th Boulevard, 12th Street", "Toronto", "Ontario", "Canada");

        Workforce testingFnSearch2 = new Workforce("testing2","Asfour", "","Amin", "Zhaki",
            "123-344-1111", "223-111-4555", "az_Asfour@linexperts.com", "En Vacaciones",
            "6th Boulevard, 12th Street", "Ottawa", "Ontario", "Canada");


        //List of inserted test records.
        List<Workforce> insertedRecords = new ArrayList<>();
        insertedRecords.add(testingFnSearch1);
        insertedRecords.add(testingFnSearch2);

        workforceRepository.saveAll(insertedRecords);

        List<Workforce> searchByFirstAndMiddleName = workforceRepository.findWorkforcesByMiddleOrFirstname("zh");
        assertEquals(2, searchByFirstAndMiddleName.size());

        workforceRepository.deleteAll(insertedRecords);
    }

    @Test
    public void insertRecordUpdateItThenDelete()
    {
        Workforce testingUpdate = new Workforce("testing1","Turgenev", "","Zhenka", "",
                "123-344-1111", "223-111-4555", "zhenka_Turgenev@linexperts.com", "En Labor",
                "5th Boulevard, 12th Street", "Toronto", "Ontario", "Canada");

        workforceRepository.save(testingUpdate);

        testingUpdate.setWrkStatus("En Incapacidad");

        workforceRepository.save(testingUpdate);

        assertEquals("En Incapacidad", workforceRepository.findById("testing1").get().getWrkStatus());

        workforceRepository.delete(testingUpdate);


        Workforce testingUpdate2 = new Workforce("testing12","Turgenev", "","Zhenka", "",
                "123-344-1111", "223-111-4555", "zhenka_Turgenev@linexperts.com", "En Labor",
                "5th Boulevard, 12th Street", "Toronto", "Ontario", "Canada");

        workforceRepository.save(testingUpdate);

        testingUpdate.setWrkStatus("En Labor");

        workforceRepository.save(testingUpdate);

        assertEquals("En Labor", workforceRepository.findById("testing1").get().getWrkStatus());

        workforceRepository.delete(testingUpdate);

        Workforce testingUpdate3 = new Workforce("testing13","Turgenev", "","Zhenka", "",
                "123-344-1111", "223-111-4555", "zhenka_Turgenev@linexperts.com", "En Labor",
                "5th Boulevard, 12th Street", "Toronto", "Ontario", "Canada");

        workforceRepository.save(testingUpdate);

        testingUpdate.setWrkStatus("En Incapacidad");

        workforceRepository.save(testingUpdate);

        assertEquals("En Incapacidad", workforceRepository.findById("testing1").get().getWrkStatus());

        workforceRepository.delete(testingUpdate);


    }

}
