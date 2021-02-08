package com.example.linexperts;

import com.example.linexperts.Models.Client;
import com.example.linexperts.Models.CorporateGroup;
import com.example.linexperts.Repositories.ClientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ClientTests {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job clientJob;

    @Test
    public void findAllClients()
    {
        List<Client> allClients = (List<Client>) clientRepository.findAll();

        assertEquals(10, allClients.size());
    }

    @Test
    public void findAClientById()
    {
        Optional<Client> foundClient = clientRepository.findById("CLIENT-10-48-465454");

        assertEquals("OfficialName client 10", foundClient.get().getCltOfficialName());
    }

    @Test
    public void findClientsByName()
    {
        List<Client> findClientsWithNumber1 = clientRepository.findByName("1");

        assertEquals(2, findClientsWithNumber1.size());

    }

    @Test
    public void filterClientsByStatus()
    {
        List<Client> findInactiveClients = clientRepository.findClientsByCltStatusIs("Inactivo");
        assertEquals(0, findInactiveClients.size());
    }

    @Test
    public void findGroupInformationForAClient()
    {
        List<String> groupInfo = clientRepository.fetchGroupInfoForClient("CLIENT-3-468-465454");

        String[] arrayOfGroupInfo = groupInfo.get(0).split(",");
        assertEquals("Vertigo Security Systems", arrayOfGroupInfo[1]);
    }

    @Test
    public void insertNewClientUpdateItThenDelete()
    {
        Client newClient = new Client("CLT-TEST-1", "CORP TURJR-4-428454", "NIT- NUM. DE IDENTIF. TRIBUTARIA",
                "CLIENT1-OFFICIAL-NAME1", "CLIENT1-COMMERCIAL-NAME1", "CONTACT-NAME", "CONTACT-LASTNAME", "ADDRESS1",
                "CITY1", "REGION1", "COUNTRY1", "PHONE1", "CELLPHONE1", "EMAIL1", "Activo");

        clientRepository.save(newClient);

        newClient.setCltCity("CITY2");

        clientRepository.save(newClient);

        assertEquals("CITY2", clientRepository.findById("CLT-TEST-1").get().getCltCity());

        clientRepository.delete(newClient);
    }


    @Test
    public void insertOrUpdateRecordsFromCsvFile() throws Exception {
        Map<String, JobParameter> maps = new HashMap<>();
        maps.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters paramaters = new JobParameters(maps);
        JobExecution jobExecution = jobLauncher.run(clientJob, paramaters);

        assertEquals("COMPLETED", jobExecution.getStatus().name());

        clientRepository.deleteClientsByCltIdContains("CLIENT-T");
    }

}
