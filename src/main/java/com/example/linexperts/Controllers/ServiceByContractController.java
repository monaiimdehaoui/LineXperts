package com.example.linexperts.Controllers;

import com.example.linexperts.Models.ContractExtension;
import com.example.linexperts.Models.ContractHeader;
import com.example.linexperts.Models.ServiceByContract;
import com.example.linexperts.Models.Services;
import com.example.linexperts.Repositories.*;
import com.example.linexperts.Utils.CompositeKeyUtils.ContractExtensionKey;
import com.example.linexperts.Utils.ErrorHandlers.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class ServiceByContractController {

    @Autowired
    private ServiceByContractRepository serviceByContractRepository;

    @Autowired
    private ServicesRepository servicesRepository;

    @Autowired
    private ContractHeaderRepository contractRepository;


    @Autowired
    private ContractExtensionRepository addendumRepository;

    @GetMapping("/ServiceOnContract")
    public List<ServiceByContract> findAll()
    {
        return (List<ServiceByContract>) serviceByContractRepository.findAll();
    }

    @GetMapping("/ServiceOnContract/{conid}")
    public List<String> findServicesOfAContract(@PathVariable("conid") String contractId)
    {
        return serviceByContractRepository.viewServicesUnderAContract(contractId);
    }

    //Filters the method above by service start date. Use in conjuction on the same page to allow the user to
    //use this filter.
    @GetMapping("/ServiceOnContract/{conid}/{serstart}")
    public List<String> findServicesOfAContractFilterByDate(@PathVariable("conid") String contractId,
                                                            @PathVariable("serstart") Date serviceStart)
    {
        return serviceByContractRepository.findServicesUnderAContractByStartDate(contractId, serviceStart);
    }

    //Search all the contracts a service is in. Fetched by id
    @GetMapping("/ServiceOnContract/id/{serid}")
    public List<String> findAllContractsForAService(@PathVariable("serid") Integer serviceId)
    {
        return serviceByContractRepository.viewOneServiceAcrossContracts(serviceId);
    }

    @GetMapping("ServiceOnContract/name{sername}")
    public List<String> findAllContractsForAServiceByName(@PathVariable("sername") String serviceName)
    {
        return serviceByContractRepository.viewOneServiceAcrossContractsSearchName(serviceName);
    }

    //Filter the above by contract status. Use in conjuction to allow the user to use this filter
    // on the same page.
    @GetMapping("/ServiceOnContract/{serid}/{constatus}")
    public List<String> findAllContractsForAServiceByStatus(@PathVariable("serid") Integer serviceId,
                                                            @PathVariable("constatus") String contractStatus)
    {
        return serviceByContractRepository.filterServicesByContractStatus(serviceId, contractStatus);
    }

    @PostMapping("/ServiceOnContract")
    public void insertNewServiceOnContract(@RequestBody ServiceByContract sBC) throws Exception
    {
            //checks if all the entities used exist
            Optional<ContractHeader> existingContract = contractRepository.findById(sBC.getConId());
            Optional<ContractExtension> existingAddendum = addendumRepository
                    .findById(new ContractExtensionKey(sBC.getConId(), sBC.getCextId()));
            Optional<Services> existingService = servicesRepository.findById(sBC.getSerId());

            //Contract validations
            if(!existingContract.isPresent())
                throw new ResourceNotFoundException("No contract found under this id ::" + sBC.getConId());

            else if(existingContract.get().getConStatus().equalsIgnoreCase("Terminado"))
                throw new Exception("Warning! You cannot add the service under this contract because its status is " +
                        existingContract.get().getConStatus());

            else if(existingContract.get().getConStartDate().after(sBC.getSerStartDate()))
                throw new Exception("Warning! You cannot set the dates of this service outside the bounds " +
                        "of the contract. Pick a date after :" + existingContract.get().getConStartDate());

            //Addendum validations
            else if(!existingAddendum.isPresent())
                throw new ResourceNotFoundException("No addendum found under this id ::" + sBC.getCextId());

            else if(existingAddendum.get().getCextStatus().equalsIgnoreCase("Terminado"))
                throw new Exception("Warning! You cannot add the service under this contract because its status is " +
                        existingAddendum.get().getCextStatus());

            else if(existingAddendum.get().getCextStartDate().after(sBC.getSerStartDate()) ||
                existingAddendum.get().getCextClosureDate().before(sBC.getSerEndDate()))
                throw new Exception("Warning! You cannot set the dates of this service outside the bounds " +
                        "of the contract. Pick a date between" + existingAddendum.get().getCextStartDate()
                + " and " + existingAddendum.get().getCextClosureDate());

            //Service validations
            else if(!existingService.isPresent())
                throw new ResourceNotFoundException("No service found under this id ::" + sBC.getSerId());

            else
                serviceByContractRepository.save(sBC);
    }

    @DeleteMapping("/ServiceOnContract")
    public void deleteServiceInAContract(@RequestBody ServiceByContract serviceDeleted)
    {
        serviceByContractRepository.delete(serviceDeleted);
    }



}
