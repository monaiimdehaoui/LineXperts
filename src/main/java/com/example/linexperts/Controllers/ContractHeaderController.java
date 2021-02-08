package com.example.linexperts.Controllers;

import java.util.List;

import com.example.linexperts.Models.ContractHeader;
import com.example.linexperts.Repositories.ContractHeaderRepository;
import com.example.linexperts.Utils.ErrorHandlers.ResourceNotFoundException;

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
public class ContractHeaderController {

    @Autowired
    private ContractHeaderRepository contractRepository;

    @GetMapping("/ContractHeader")
    public List<ContractHeader> getAllContracts() {
        return (List<ContractHeader>) contractRepository.findAll();
    }

    @GetMapping("/ContractHeader/conId/{id}")
    public ResponseEntity<ContractHeader> getContractbYiD(@PathVariable("id") String conId)
            throws ResourceNotFoundException {
        ContractHeader ch = contractRepository.findById(conId)
                .orElseThrow(() -> new ResourceNotFoundException("No contract found by this id ::" + conId));

        return ResponseEntity.ok().body(ch);
    }

    // Search by group id
    @GetMapping("/ContractHeader/groupid/{id}")
    public List<String> getAllContractsUnderGroupById(@PathVariable(value = "id") String grId) {
        return contractRepository.findContractHeadersByCorporateGroupId(grId);
    }

    // Search by group name
    @GetMapping("/ContractHeader/groupname/{name}")
    public List<String> getAllContractsUnderGroupByName(@PathVariable(value = "name") String grName) {
        return contractRepository.findContractHeadersFromACorporateGroupByName(grName);
    }

    // Search by Client id
    @GetMapping("/ContractHeader/clientid/{id}")
    public List<ContractHeader> getAllContractsUnderAClientById(@PathVariable(value = "id") String clId) {
        return contractRepository.findContractHeadersByCltId(clId);
    }

    // Search by client name
    @GetMapping("/ContractHeader/clientname/{cltname}")
    public List<String> getAllContractsUnderAClientByName(@PathVariable(value = "name") String cltName) {
        return contractRepository.findContractHeaderByClientName(cltName);
    }

    // Get all addendums for a specific contract. Fetched by contract id
    @GetMapping("/ContractHeader/contractAddendum/{conid}")
    public List<String> getAllAddendumsUnderASingleContract(@PathVariable(value = "conid") String contractId) {
        return contractRepository.listAddendumsForASingleContract(contractId);
    }

    // Get financial information for a contract. Fetched by contract id.
    @GetMapping("/ContractHeader/financial/{conid}")
    public List<String> getFinancialInfoForAContract(@PathVariable("conid") String contractId) {
        return contractRepository.displayAContractsFinancialInformation(contractId);
    }

    // Filter contracts by status
    @GetMapping("/ContractHeader/filters/{status}")
    public List<ContractHeader> filterContractsByStatus(@PathVariable("status") String conStatus) {
        return contractRepository.findContractHeadersByConStatus(conStatus);
    }

    // Filter contracts by RUP
    @GetMapping("/ContractHeader/filter/{rup}")
    public List<ContractHeader> filterByRUP(@PathVariable("rup") boolean RUPStatus) {
        return contractRepository.findContractHeadersBySentToRup(RUPStatus);
    }

    @PostMapping("/ContractHeader")
    public void createContractHeader(@RequestBody ContractHeader newContract) {
        contractRepository.save(newContract);
    }

    // Update a contract by id
    @PutMapping("/ContractHeader/id/{id}")
    public ResponseEntity<ContractHeader> updateContract(@PathVariable("id") String id,
            @RequestBody ContractHeader contractUpdated) throws ResourceNotFoundException {

        ContractHeader contractToUpdate = contractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No contract exists under this id ::" + id));

        if (contractUpdated.getConClosureDate() != null && !contractUpdated.getConClosureDate().toString().isEmpty())
            contractToUpdate.setConClosureDate(contractUpdated.getConClosureDate());

        if (contractUpdated.getConStatus() != null && !contractUpdated.getConStatus().isEmpty())
            contractToUpdate.setConStatus(contractUpdated.getConStatus());

        if (contractUpdated.getConDescription() != null && !contractUpdated.getConDescription().isEmpty())
            contractToUpdate.setConDescription(contractUpdated.getConDescription());

        return ResponseEntity.ok(contractRepository.save(contractToUpdate));
    }
}
