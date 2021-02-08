package com.example.linexperts;

import com.example.linexperts.Models.ContractHeader;
import com.example.linexperts.Repositories.ContractExtensionRepository;
import com.example.linexperts.Repositories.ContractHeaderRepository;
import com.example.linexperts.Utils.CompositeKeyUtils.ContractExtensionKey;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ContractTests {

    @Autowired
    private ContractHeaderRepository contractRepository;

    @Autowired
    private ContractExtensionRepository addendumRepository;

    @Test
    public void findAllContracts()
    {
        List<ContractHeader> allContracts = (List<ContractHeader>) contractRepository.findAll();

        assertEquals(12,allContracts.size());
    }

    @Test
    public void findAContractById()
    {
        Optional<ContractHeader> foundContract = contractRepository.findById("CONTRACT-2-412-042-242");

        assertEquals("CLIENT-9-468-465454", foundContract.get().getCltId());
    }

    @Test
    public void findAllContractsOfAClient()
    {
        List<ContractHeader> contractsOfAClient = contractRepository.findContractHeadersByCltId("CLIENT-6-468-465454");

        assertEquals(2, contractsOfAClient.size());
    }

    //This searches for a match either in the official or commercial name, not the contact's first nor last names.
    @Test
    public void findContractsOfAClientByNames()
    {
        List<String> contractsUnderAClient = contractRepository.findContractHeaderByClientName("1");

        assertEquals(2, contractsUnderAClient.size());
    }

    @Test
    public void findContractsOfAGroupByName()
    {
        List<String> contractsUnderAGroup = contractRepository
                .findContractHeadersFromACorporateGroupByName("Vertigo");
        assertEquals(4, contractsUnderAGroup.size());
    }

    @Test
    public void findContractsOfAGroupById()
    {
        //This group is still Vertigo Security.
        List<String> contractsUnderAGroup = contractRepository
                .findContractHeadersByCorporateGroupId("CORP TURJR-3-246545");

        assertEquals(4, contractsUnderAGroup.size());
    }

    @Test
    public void listAddendumsUnderAContract()
    {
        List<String> addendumsUnderAContract = contractRepository
                .listAddendumsForASingleContract("CONTRACT-9-792-486-546");

        assertEquals(2, addendumsUnderAContract.size());
    }

    @Test
    public void displayFinancialInfoOfAcontract()
    {
        List<String> financialInfoOfAContract = contractRepository
                .displayAContractsFinancialInformation("CONTRACT-9-792-486-546");

        String[] financialInfoOfCurrentContract = financialInfoOfAContract.get(0).split(",");
        assertEquals("500.0", financialInfoOfCurrentContract[5]);
    }

    @Test
    public void filterContractsByStatus()
    {
        List<ContractHeader> closedContracts = contractRepository.findContractHeadersByConStatus("Terminado");

        assertEquals(3, closedContracts.size());
    }

    @Test
    public void filterContractsByRupStatus()
    {
        List<ContractHeader> contractsNotSentToRup = contractRepository.findContractHeadersBySentToRup(false);

        assertEquals(10, contractsNotSentToRup.size());
    }

    @Test
    public void createContractUpdateItThenDelete()
    {
        ContractHeader newTestContract = new ContractHeader("TEST-CONTRACT","CLIENT-1-468-465454",
                "This is a test", Date.valueOf("2021-03-21") , Date.valueOf("2023-11-01"),
                null, "En Tramite", false, null);

       contractRepository.save(newTestContract);

        newTestContract.setConDescription("I modified this description");

        contractRepository.save(newTestContract);

        assertEquals("I modified this description",
                contractRepository.findById("TEST-CONTRACT").get().getConDescription());


        addendumRepository.deleteById(new ContractExtensionKey("TEST-CONTRACT","001"));
        contractRepository.delete(newTestContract);

    }
}
