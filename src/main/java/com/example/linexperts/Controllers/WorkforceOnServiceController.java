package com.example.linexperts.Controllers;

import java.util.List;

import com.example.linexperts.Models.Workforce;
import com.example.linexperts.Models.WorkforceOnService;
import com.example.linexperts.Repositories.ContractHeaderRepository;
import com.example.linexperts.Repositories.WorkforceOnServiceRepository;
import com.example.linexperts.Repositories.WorkforceQualificationsRepository;
import com.example.linexperts.Repositories.WorkforceRepository;
import com.example.linexperts.Utils.ErrorHandlers.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1")
public class WorkforceOnServiceController {

    @Autowired
    private WorkforceOnServiceRepository workforceOnServiceRepo;

    @Autowired
    private WorkforceRepository workforceRepository;

    @Autowired
    private ContractHeaderRepository contractRepository;

    @Autowired
    private WorkforceQualificationsRepository qualificationsRepository;

    //Find workforces with services assigned
    @GetMapping("/workforceAssigned")
    public List<WorkforceOnService> listWorkforcesWithServicesAssigned()
    {
        return (List<WorkforceOnService>) workforceOnServiceRepo.findAll();
    }

    //Find workforces who have no services assigned
    @GetMapping ("/workforceAssigned/emptyServices")
    public List<String> listUnassignedServices()
    {
        return workforceOnServiceRepo.fetchServicesWithoutWorkforceAssigned();
    }

    //Number of workforces working under a contract, sorted by service ID
    @GetMapping("/workforceAssigned/{conId}")
    public List<String> listWorkoforceAndServiceInfoUnderASpecificContract
            (@PathVariable("conId") String contractId)
    {
        return workforceOnServiceRepo.fetchServiceInfoInAContract(contractId);
    }

    //Fetch detailed workforce info (work_id) from the previous method.
    @GetMapping("/workforceAssigned/{conId}/{serId}")
    public List<String> listOfWorkforcesAssignedToAServiceForASpecificContract(@PathVariable("conId") String contractId,
                                                                               @PathVariable("serId") Integer serviceId)
    {
        return workforceOnServiceRepo.fetchWorkforceWorkingInAserviceOnASingleContract(contractId, serviceId);
    }

    @PostMapping("/workforceAssigned")
    public void addWorkforceToService(@RequestBody WorkforceOnService wrkOnSer) throws Exception
    {
        Workforce checkStatus = workforceRepository.findById(wrkOnSer.getWrkId())
                .orElseThrow(()->
                        new ResourceNotFoundException("No workforce found under this id :: " +
                                wrkOnSer.getWrkId()));

        //Check for workforce status
        if(checkStatus.getWrkStatus().equalsIgnoreCase("En Retiro"))
            throw new Exception("You cannot assign this workforce (" + checkStatus.getWrkId() + ") because" +
                    " their status is: " + checkStatus.getWrkStatus());

        //Check for qualifications.
        else if(!qualificationsRepository.findServicesQualifiedEmployeesByServiceId(wrkOnSer.getWrkId()).contains(wrkOnSer.getSerId()))
            throw new Exception("Warning! This employee is not qualified for the service you want to assign them to!");

        //Check the assignment date
        else if(wrkOnSer.getAssignedDate().before(contractRepository.findById(wrkOnSer.getConId()).get().getConStartDate())
            || wrkOnSer.getAssignedDate().after(contractRepository.findById(wrkOnSer.getConId()).get().getConEndDate()))
                throw new Exception("Warning! You can't assign a workforce to a date outside the contract's boundaries!");

        else
            workforceOnServiceRepo.save(wrkOnSer);

    }

    @DeleteMapping("/workforceAssigned")
    public void removeWorkforceFromService(@RequestBody WorkforceOnService unassignWorkforce)
    {
        workforceOnServiceRepo.delete(unassignWorkforce);
    }



}
