package com.example.linexperts.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import com.example.linexperts.Models.Workforce;
import com.example.linexperts.Repositories.WorkforceRepository;
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
public class WorkforceController {

  // Repo reference
  @Autowired
  private WorkforceRepository workforceRepository;

  // Varaibles for batch processing
  @Autowired
  JobLauncher jobLauncher;

  @Autowired
  Job workforceJob;

  // List all workforce
  @GetMapping("/workforce")
  public Iterable<Workforce> getAll() {

    return workforceRepository.findAll();
  }

  // get workforce by ID
  @GetMapping("/workforce/{id}")
  public Workforce getWorkforceById(@PathVariable(value = "id") String workforceId) throws ResourceNotFoundException {

    Workforce wrkfc = workforceRepository.findById(workforceId)
        .orElseThrow(() -> new ResourceNotFoundException("No employee found with this id ::" + workforceId));

    return wrkfc;
  }

  // get workforce by Lastname(s). Typing S will retrieve Balas, Gibson, Sanchez,
  // Smith
  @GetMapping("/workforce/lastname/{lname}")
  public List<Workforce> getWorkforcesByLastName(@PathVariable(value = "lname") String lastname) {
    return this.workforceRepository.findByLastNames(lastname);
  }

  // get workforce by firstname/middlename. Typing An will retrieve Savannah, Ana,
  // Antonio, Sebastian
  @GetMapping("/workforce/firstname/{fname}")
  public List<Workforce> getWorkforcesByFirstNames(@PathVariable(value = "fname") String firstName) {
    return this.workforceRepository.findWorkforcesByMiddleOrFirstname(firstName);
  }

  // Insert workforce
  @PostMapping(value = "/workforce")
  public void createWorkforce(@RequestBody @Valid Workforce workforce) throws Exception {

    Workforce workforce1 = workforce;
    Optional<Workforce> existingWorkforce = workforceRepository.findById(workforce.getWrkId());
    if (existingWorkforce.isEmpty())
      workforceRepository.save(workforce);
    else
      throw new Exception("Warning! This workforce already exists");

    workforceRepository.save(workforce);
  }

  // Insert workforce in a batch. Works for batch update too.
  @PostMapping("/batch/workforce")
  public BatchStatus createWorkforceBatch() throws Exception {
    Map<String, JobParameter> maps = new HashMap<>();
    maps.put("tiempo", new JobParameter(System.currentTimeMillis()));
    JobParameters paramaters = new JobParameters(maps);
    JobExecution jobExecution = jobLauncher.run(workforceJob, paramaters);

    System.out.println("Estado de ejecucion: " + jobExecution.getStatus());

    System.out.println("Insertando Datos en Batch...");
    while (jobExecution.isRunning()) {
      System.out.println("...");
    }

    return jobExecution.getStatus();
  }

  // Update workforce
  @PutMapping("/workforce/{id}")
  public ResponseEntity<Workforce> updateWorkforce(@PathVariable(value = "id") String workforceId,
      @RequestBody Workforce workforceInfo) throws ResourceNotFoundException {
    Workforce wrkfc_toUpdate = workforceRepository.findById(workforceId)
        .orElseThrow(() -> new ResourceNotFoundException("No employee found with this id ::" + workforceId));

    if (workforceInfo.getWrkStatus() != null && !workforceInfo.getWrkStatus().isEmpty())
      wrkfc_toUpdate.setWrkStatus(workforceInfo.getWrkStatus());

    if (workforceInfo.getWrkCorpEmail() != null && !workforceInfo.getWrkCorpEmail().isEmpty())
      wrkfc_toUpdate.setWrkCorpEmail(workforceInfo.getWrkCorpEmail());

    if (workforceInfo.getWrkAddress() != null && !workforceInfo.getWrkAddress().isEmpty())
      wrkfc_toUpdate.setWrkAddress(workforceInfo.getWrkAddress());

    if (workforceInfo.getWrkCellNo() != null && !workforceInfo.getWrkCellNo().isEmpty())
      wrkfc_toUpdate.setWrkCellNo(workforceInfo.getWrkCellNo());

    if (workforceInfo.getWrkPhoneNo() != null && !workforceInfo.getWrkPhoneNo().isEmpty())
      wrkfc_toUpdate.setWrkPhoneNo(workforceInfo.getWrkPhoneNo());

    if (workforceInfo.getWrkCity() != null && !workforceInfo.getWrkCity().isEmpty())
      wrkfc_toUpdate.setWrkCity(workforceInfo.getWrkCity());

    if (workforceInfo.getWrkRegion() != null && !workforceInfo.getWrkRegion().isEmpty())
      wrkfc_toUpdate.setWrkRegion(workforceInfo.getWrkRegion());

    if (workforceInfo.getWrkCountry() != null && !workforceInfo.getWrkCountry().isEmpty())
      wrkfc_toUpdate.setWrkCountry(workforceInfo.getWrkCountry());

    return ResponseEntity.ok(workforceRepository.save(wrkfc_toUpdate));
  }

}
