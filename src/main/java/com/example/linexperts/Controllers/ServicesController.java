package com.example.linexperts.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import com.example.linexperts.Models.Services;
import com.example.linexperts.Repositories.ServicesRepository;
import com.example.linexperts.Utils.ErrorHandlers.ResourceNotFoundException;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ServicesController {

    // Vriables for batch processing
    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job serviceJob;

    // Repo reference
    @Autowired
    private ServicesRepository servicesRepository;

    // List all services
    @GetMapping("/service")
    public List<Services> getAll() {
        return (List<Services>) this.servicesRepository.findAll();
    }

    // Get one service by ID
    @GetMapping("/service/id/{id}")
    public ResponseEntity<Services> getServiceById(@PathVariable(value = "id") Integer id)
            throws ResourceNotFoundException {
        Services serv = servicesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found for this id ::" + id));

        return ResponseEntity.ok().body(serv);
    }

    // Get list of services based on what the user typed
    @GetMapping("/service/name/{name}")
    public List<Services> getAllWithNameLike(@PathVariable(value = "name") String name) {
        return this.servicesRepository.findServicesByServiceNameLike(name);
    }

    // Insert a service
    @PostMapping("/service")
    public void createService(@RequestBody Services service) throws Exception {
        Optional<Services> existingService = servicesRepository.findServicesBySerNameIgnoreCase(service.getSerName());
        if (existingService.isPresent())
            throw new Exception("Warning! The service " + service.getSerName() + " already exists!");
        else
            servicesRepository.save(service);
    }

    // Add services in batch. Works for batch update too.
    @PostMapping("/batch/service")
    public BatchStatus createServicesBatch() throws Exception {
        Map<String, JobParameter> map = new HashMap<>();
        map.put("tiempo", new JobParameter(System.currentTimeMillis()));
        JobParameters paramaters = new JobParameters(map);
        JobExecution jobExecution = jobLauncher.run(serviceJob, paramaters);

        System.out.println("Estado de ejecucion: " + jobExecution.getStatus());

        System.out.println("Insertando Datos en Batch...");
        while (jobExecution.isRunning()) {
            System.out.println("...");
        }

        return jobExecution.getStatus();
    }

    // Update a service
    @PutMapping("/service/id/{id}")
    public ResponseEntity<Services> updateService(@PathVariable(value = "id") Integer id,
            @Valid @RequestBody Services serv) throws ResourceNotFoundException {
        Services servToUpdate = servicesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No service found by this id ::" + id));

        if (serv.getSerTariff() != 0)
            servToUpdate.setSerTariff(serv.getSerTariff());

        if (serv.getSerUnit() != null && !serv.getSerUnit().isEmpty())
            servToUpdate.setSerUnit(serv.getSerUnit());

        if (serv.getSerDescription() != null && !serv.getSerDescription().isEmpty())
            servToUpdate.setSerDescription(serv.getSerDescription());

        return ResponseEntity.ok(servicesRepository.save(servToUpdate));
    }

}
