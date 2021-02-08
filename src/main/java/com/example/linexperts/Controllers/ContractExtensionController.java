package com.example.linexperts.Controllers;

import java.util.List;
import java.util.Optional;

import com.example.linexperts.Models.ContractExtension;
import com.example.linexperts.Models.ContractHeader;
import com.example.linexperts.Repositories.ContractExtensionRepository;
import com.example.linexperts.Repositories.ContractHeaderRepository;
import com.example.linexperts.Utils.CompositeKeyUtils.ContractExtensionKey;
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
public class ContractExtensionController {

    @Autowired
    private ContractExtensionRepository extensionRepository;

    @Autowired
    private ContractHeaderRepository contractRepo;

    // List all contract extensions
    @GetMapping("/ContractExtension")
    public List<ContractExtension> getAll() {
        return (List<ContractExtension>) extensionRepository.findAll();
    }

    @GetMapping("/ContractExtension/{conid}/{extid}")
    public ResponseEntity<ContractExtension> getExtensionById(@PathVariable("conid") String contractId,
            @PathVariable("extid") String addendumId) throws ResourceNotFoundException {
        ContractExtension ce = extensionRepository.findById(new ContractExtensionKey(contractId, addendumId))
                .orElseThrow(
                        () -> new ResourceNotFoundException("No extension found under with this id ::" + addendumId));

        return ResponseEntity.ok().body(ce);
    }

    // List all contracts under a client. Fetch by Id
    @GetMapping("/ContractExtension/clid/{id}")
    public List<String> getAllExtensionByClientId(@PathVariable("id") String clientId) {
        return extensionRepository.findContractExtensionsByClientId(clientId);
    }

    // List all contracts under a client. Fetch by name
    @GetMapping("/ContractExtension/clname/{name}")
    public List<String> getAllExtensionByClientName(@PathVariable("name") String clientName) {
        return extensionRepository.findContractExtensionsByClientName(clientName);
    }

    // List all contracts under a group. Fetch by Id
    @GetMapping("/ContractExtension/grid/{id}")
    public List<String> getAllExtensionsByGroupId(@PathVariable("id") String groupId) {
        return extensionRepository.findContractExtensionsOfAGroup(groupId);
    }

    // Filter a client's contracts by status
    @GetMapping("/ContractExtension/{clid}/{status}")
    public List<String> getAClientsExtensionsByStatus(@PathVariable("clid") String clientId,
            @PathVariable("status") String status) {
        return extensionRepository.filterAClientsExtensionsByStatus(clientId, status);
    }

    @PostMapping("/ContractExtension")
    public void addExtension(@RequestBody ContractExtension ce) throws Exception {
        Optional<ContractHeader> existingContract = contractRepo.findById(ce.getConId());
        Optional<ContractExtension> existingAddendum = extensionRepository
                .findById(new ContractExtensionKey(ce.getConId(), ce.getCextId()));
        if (!existingContract.isPresent()) {
            throw new ResourceNotFoundException("No contract found under this id ::" + ce.getConId() + " "
                    + ce.getCextId() + " You cannot " + "bind an addendum to it.");
        }

        else {
            if (existingContract.get().getConStatus().equalsIgnoreCase("Terminado"))
                throw new Exception("Warning. This contract's status is: " + existingContract.get().getConStatus()
                        + ". It is not elegible to have new addendums registered to it");

            if (existingContract.isPresent() && existingAddendum.isPresent())
                throw new Exception("Warning! This contract: " + ce.getConId() + " already has"
                        + " an addendum with this id: " + ce.getCextId());

            extensionRepository.save(ce);
        }
    }

    // Update a contract. Fetched by their id (cext_id)
    @PutMapping("/ContractExtension/{conid}/{cextid}")
    public void updateAddendumInformation(@PathVariable("conid") String contractId,
            @PathVariable("cextid") String addendumId, @RequestBody ContractExtension ceUpdates) throws Exception {

        extensionRepository.findById(new ContractExtensionKey(contractId, addendumId));
        // Invoiced cost, closure date, status,
        Optional<ContractExtension> addendumToUpdate = extensionRepository
                .findById(new ContractExtensionKey(contractId, addendumId));
        if (!addendumToUpdate.isPresent())
            throw new ResourceNotFoundException("No addendums found under this id: " + addendumId);

        else {
            if (ceUpdates.getCextInvoicedCost() != 0)
                addendumToUpdate.get().setCextInvoicedCost(ceUpdates.getCextInvoicedCost());

            if (ceUpdates.getCextClosureDate() != null
                    && !ceUpdates.getCextClosureDate().after(addendumToUpdate.get().getCextClosureDate()))
                addendumToUpdate.get().setCextClosureDate(ceUpdates.getCextClosureDate());

            if (ceUpdates.getCextStatus() != null && !ceUpdates.getCextStatus().isEmpty())
                addendumToUpdate.get().setCextStatus(ceUpdates.getCextStatus());

        }

    }

}
