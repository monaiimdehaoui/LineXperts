package com.example.linexperts.Controllers;

import com.example.linexperts.Models.WorkforceQualifications;
import com.example.linexperts.Repositories.WorkforceQualificationsRepository;
import com.example.linexperts.Utils.ErrorHandlers.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class QualificationsController {

    @Autowired
    private WorkforceQualificationsRepository qualificationsRepository;

    //List all qualifications
    @GetMapping("/qualifications")
    public List<WorkforceQualifications> getAll() {
        return (List<WorkforceQualifications>)
            qualificationsRepository.findAll();
    }

    //List the qualified workforces for one service, regardless of status
    @GetMapping("qualifications/services/{name}")
    public List<String> getWorkforceQualifiedForService(@PathVariable("name") String serviceName)
    {
        return this.qualificationsRepository.findAllQualifiedEmployees(serviceName);
    }

    //List services which have active workforces available ('en labor')
    @GetMapping("qualifications/workforce_active")
    public List<String> getListOfAvailableServices()
    {
        return this.qualificationsRepository.findServicesWithActiveWorkforce();
    }

    //List all the services a workforce is qualified to do. Works with work ids.
    @GetMapping("qualifications/findQualificationFor/{wrkId}")
    public ResponseEntity<WorkforceQualifications> getServiceQualificationsForAWorkforce(@PathVariable("wrkId") String workforceId) throws Exception
    {
        WorkforceQualifications findWorkforce = qualificationsRepository.findById(workforceId)
                .orElseThrow(()->new ResourceNotFoundException("No workforce found by this id ::" + workforceId));

        return ResponseEntity.ok().body(findWorkforce);

    }

    //Careful handling exceptions here. You must use both a workId that exists and a serviceId that exists.
    @PostMapping("/qualifications")
    public void addNewQualifications(@RequestBody WorkforceQualifications wq)
    {
        qualificationsRepository.save(wq);
    }

    @DeleteMapping("/qualifications/{wrkid}/{serid}}")
    public void deleteQualification(@PathVariable("wrkid") String workfId, @PathVariable("serid") int serId) throws ResourceNotFoundException
    {
        WorkforceQualifications wqToDelete = qualificationsRepository.findById(workfId)
                .orElseThrow(()-> new ResourceNotFoundException("No workforce found under this id :;" + workfId));

        List<Integer> QualificationsOfAnEmployee = qualificationsRepository.findServicesForWorkforce(workfId);
        for(int i = 0; i < QualificationsOfAnEmployee.size(); i++)
        {
            if(QualificationsOfAnEmployee.get(i) == wqToDelete.getSerId())
                qualificationsRepository
                        .deleteWorkforceQualificationsBySerIdAndWrkId(wqToDelete.getSerId(),
                        wqToDelete.getWrkId());

        }

    }

}
