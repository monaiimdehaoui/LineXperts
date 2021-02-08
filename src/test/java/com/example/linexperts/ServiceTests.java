package com.example.linexperts;

import com.example.linexperts.Models.Services;
import com.example.linexperts.Repositories.ServicesRepository;
import org.junit.jupiter.api.Test;
import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ServiceTests {

    @Autowired
    ServicesRepository servicesRepository;

    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job serviceJob;


    @Test
    public void findAllServices()
    {
        Iterable<Services> allServices = servicesRepository.findAll();
        assertNotNull(allServices);
    }

    @Test
    public void findServiceById()
    {
        Optional<Services> service = servicesRepository.findById(1);
        assertEquals("Database Maintenance", service.get().getSerName());
    }

    @Test
    public void insertNewServiceThenDelete()
    {
        Services newService = new Services();

        newService.setSerName("Test1");
        newService.setSerUnit("Semanal");
        newService.setSerTariff(1200000);
        newService.setSerDescription("Testing Creation");

        servicesRepository.save(newService);
        servicesRepository.delete(newService);
    }

    @Test
    public void insertNewServiceUpdateItThenDelete()
    {
        Services newService = new Services();

        newService.setSerName("Test2");
        newService.setSerUnit(null);
        newService.setSerTariff(123333);
        newService.setSerDescription("Testing update");

        servicesRepository.save(newService);

        //Don't use ID because it will change on each run due to the auto-increment nature of the PK
        Services insertedService = servicesRepository.findServicesBySerNameContains("Test");

        insertedService.setSerUnit("Modified Unit");

        assertEquals("Modified Unit", insertedService.getSerUnit());
        servicesRepository.delete(newService);
    }

    @Test
    public void findListOfServicesByName()
    {

        List<Services> servicesWithOu = servicesRepository.findServicesByServiceNameLike("ou");

        assertEquals(3, servicesWithOu.size());
    }

    @Test
    public void insertServicesFromCsvThenDelete() throws Exception {
        Map<String, JobParameter> maps = new HashMap<>();
        maps.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters parameters = new JobParameters(maps);
        JobExecution jobExecution = jobLauncher.run(serviceJob, parameters);

        assertEquals("COMPLETED", jobExecution.getStatus().name());

        servicesRepository.deleteBySerName("Test");

    }
}
