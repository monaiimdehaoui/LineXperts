package com.example.linexperts.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import com.example.linexperts.Models.Client;
import com.example.linexperts.Models.CorporateGroup;
import com.example.linexperts.Repositories.ClientRepository;
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
public class ClientController
{
    //Variables for batch processing
    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job clientJob;

    //Repo references
    @Autowired
    ClientRepository clientRepository;

    @Autowired
    CorporateGroupRepository groupRepository;

    @GetMapping("/clients")
    public List<Client> getAll(){ return (List<Client>) this.clientRepository.findAll();}

    @GetMapping("/clients/id/{id}")
    public ResponseEntity<Client> findById(@PathVariable(value = "id") String clientId) throws Exception
    {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(()-> new ResourceNotFoundException("No client found for this id ::" + clientId));

        return ResponseEntity.ok().body(client);
    }

    @GetMapping("/clients/name/{name}")
    public List<Client> findClientsByName(@PathVariable(value="name") String clientName)
    {
        return clientRepository.findByName(clientName);
    }

    //Use this method to be the result of a user clicking a button to display the group info.
    //That way, the id will never be invalid/null.
    @GetMapping("/clients/{id}/group_info")
    public ResponseEntity<List<String>> getGroupInfoForClient(@PathVariable(value = "id") String clientId)
    {
        return ResponseEntity.ok().body(clientRepository.fetchGroupInfoForClient(clientId));
    }

    //filters by status
    @GetMapping("/clients/status/{status}")
    public List<Client> filterClientsByStatus(@PathVariable(value="status") String status)
    {
        return clientRepository.findClientsByCltStatusIs(status);
    }

    //Add client
    @PostMapping("/clients")
    public void createClient(@RequestBody Client client) throws Exception
    {
        Optional<CorporateGroup> existingGroup = groupRepository.findById(client.getGroupId());
        Optional<Client> existingClientById = clientRepository.findById(client.getCltId());

        //The combination of the group id and client id must be unique.
        if(existingGroup.isPresent() && existingClientById.isPresent())
            throw new Exception("Warning! This group: " + client.getGroupId() + "already has a client " +
                    "under this id: " + client.getCltId());

        //Can't add new client if group isn't active.
        else {
           if(!existingGroup.get().getGroupStatus().equalsIgnoreCase("Activo"))
               throw new Exception("Warning! This group: " + client.getGroupId() + "is not active. You can only add " +
                       "clients to existing active groups.");

            clientRepository.save(client);
        }
    }

    //Add clients in batch. Works for batch update too.
    @PostMapping("/batch/clients")
    public BatchStatus createClientsBatch() throws Exception
    {
        Map<String, JobParameter> map = new HashMap<>();
        map.put("tiempo", new JobParameter(System.currentTimeMillis()));
        JobParameters paramaters = new JobParameters(map);
        JobExecution jobExecution = jobLauncher.run(clientJob, paramaters);

        System.out.println("Estado de ejecucion: "+ jobExecution.getStatus());

        System.out.println("Insertando Datos en Batch...");
        while(jobExecution.isRunning())
        {
            System.out.println("...");
        }

        return jobExecution.getStatus();
    }

    //Update client
    @PutMapping("/clients/id/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable(value = "id") String clientId,
                                               @Valid @RequestBody Client client) throws ResourceNotFoundException
    {
        Client clientToUpdate = clientRepository.findById(clientId)
                .orElseThrow(()-> new ResourceNotFoundException("No client exists by this id ::" + clientId));

        //Update fields according to the fields filled/changed within the form.
        if(client.getCltCommercialName() != null && !client.getCltCommercialName().isEmpty())
            clientToUpdate.setCltCommercialName(client.getCltCommercialName());

        if(client.getCltFirstName() != null && !client.getCltFirstName().isEmpty())
            clientToUpdate.setCltFirstName(client.getCltFirstName());

        if(client.getCltLastName() != null && !client.getCltLastName().isEmpty())
            clientToUpdate.setCltLastName(client.getCltLastName());

        if(client.getCltEmailAddr() != null && !client.getCltEmailAddr().isEmpty())
            clientToUpdate.setCltEmailAddr(client.getCltEmailAddr());

        if(client.getCltAddress() != null && !client.getCltAddress().isEmpty())
            clientToUpdate.setCltAddress(client.getCltAddress());

        if(client.getCltCity() != null && !client.getCltCity().isEmpty())
            clientToUpdate.setCltCity(client.getCltCity());

        if(client.getCltCountry() != null && !client.getCltCountry().isEmpty())
            clientToUpdate.setCltCountry(client.getCltCountry());

        if(client.getCltRegion() != null && !client.getCltRegion().isEmpty())
            clientToUpdate.setCltRegion(client.getCltRegion());

        if(client.getCltStatus() != null && !client.getCltStatus().isEmpty())
            clientToUpdate.setCltStatus(client.getCltStatus());

        return ResponseEntity.ok(clientRepository.save(clientToUpdate));
    }
}
