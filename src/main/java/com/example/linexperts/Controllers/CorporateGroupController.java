package com.example.linexperts.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.example.linexperts.Models.CorporateGroup;
import com.example.linexperts.Repositories.CorporateGroupRepository;
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
public class CorporateGroupController {

    // Variables for batch processing
    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job corpGroupJob;

    // Repo reference
    @Autowired
    private CorporateGroupRepository corporateGroupRepository;

    // List all groups
    @GetMapping("/corp_group")
    public List<CorporateGroup> getAll() {
        return (List<CorporateGroup>) corporateGroupRepository.findAll();
    }

    // List all groups with a name like the user input
    @GetMapping("/corp_group/name/{name}")
    public ResponseEntity<List<CorporateGroup>> getAllByName(@PathVariable(value = "name") String name) {
        return ResponseEntity.ok().body(corporateGroupRepository.findByName(name));
    }

    // Filter all groups by status
    @GetMapping("/corp_group/status/{status}")
    public ResponseEntity<List<CorporateGroup>> filterGroupsByStatus(@PathVariable(value = "status") String status) {
        return ResponseEntity.ok().body(corporateGroupRepository.getCorporateGroupByGroupStatusIsIgnoreCase(status));
    }

    // Find unique group by ID
    @GetMapping("/corp_group/id/{id}")
    public ResponseEntity<CorporateGroup> getCorporateGroupById(@PathVariable(value = "id") String corpID)
            throws ResourceNotFoundException {
        CorporateGroup cg = corporateGroupRepository.findById(corpID)
                .orElseThrow(() -> new ResourceNotFoundException("Corporate Group not found for this id ::" + corpID));

        return ResponseEntity.ok().body(cg);
    }

    // Find all clients of a group by name. Name search works just the same.
    @GetMapping("/corp_group/clients/{grpName}")
    public ResponseEntity<List<String>> getClientsOfAGroup(@PathVariable(value = "grpName") String name) {
        return ResponseEntity.ok().body(corporateGroupRepository.getAllClientsOfAgroup(name));
    }

    // Insert corporate group
    @PostMapping("/corp_group")
    public void createGroup(@RequestBody CorporateGroup cg) {
        corporateGroupRepository.save(cg);
    }

    // Insert corporate groups by batch. Works for batch updates too
    @PostMapping("/batch/corp_group")
    public BatchStatus createCorpGroupBatch() throws Exception {
        Map<String, JobParameter> maps = new HashMap<>();
        maps.put("tiempo", new JobParameter(System.currentTimeMillis()));
        JobParameters paramaters = new JobParameters(maps);
        JobExecution jobExecution = jobLauncher.run(corpGroupJob, paramaters);

        System.out.println("Estado de ejecucion: " + jobExecution.getStatus());

        System.out.println("Insertando Datos en Batch...");
        while (jobExecution.isRunning()) {
            System.out.println("...");
        }

        return jobExecution.getStatus();
    }

    // Update corporate group info
    @PutMapping("/corp_group/id/{id}")
    public ResponseEntity<CorporateGroup> updateGroup(@PathVariable(value = "id") String corpID,
            @Valid @RequestBody CorporateGroup crp_gr) {
        CorporateGroup groupToUpdate = corporateGroupRepository.findById(corpID)
                .orElseThrow(() -> new RuntimeException("Corporate Group not found for this id ::" + corpID));

        if (crp_gr.getGroupName() != null && !crp_gr.getGroupName().isEmpty())
            groupToUpdate.setGroupName(crp_gr.getGroupName());
        if (crp_gr.getGroupEmail() != null && !crp_gr.getGroupEmail().isEmpty())
            groupToUpdate.setGroupEmail(crp_gr.getGroupEmail());
        if (crp_gr.getGroupCity() != null && !crp_gr.getGroupCity().isEmpty())
            groupToUpdate.setGroupCity(crp_gr.getGroupCity());
        if (crp_gr.getGroupCountry() != null && !crp_gr.getGroupCountry().isEmpty())
            groupToUpdate.setGroupCountry(crp_gr.getGroupCountry());
        if (crp_gr.getGroupRegion() != null && !crp_gr.getGroupRegion().isEmpty())
            groupToUpdate.setGroupRegion(crp_gr.getGroupRegion());

        return ResponseEntity.ok(corporateGroupRepository.save(groupToUpdate));
    }

}
