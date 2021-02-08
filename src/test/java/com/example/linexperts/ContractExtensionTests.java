package com.example.linexperts;

import com.example.linexperts.Models.ContractExtension;
import com.example.linexperts.Repositories.ContractExtensionRepository;
import com.example.linexperts.Utils.CompositeKeyUtils.ContractExtensionKey;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.text.DecimalFormat;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ContractExtensionTests {

    @Autowired
    private ContractExtensionRepository addendumRepository;

    @Test
    public void findAll()
    {
        List<ContractExtension> allAddendums = (List<ContractExtension>) addendumRepository.findAll();

        assertEquals(17, allAddendums.size());
    }

    @Test
    public void findAnAddendum()
    {
        Optional<ContractExtension> foundAddendum =
                addendumRepository.findById(
                        new ContractExtensionKey("CONTRACT-1-428-346-215",
                                "CONTR-EXT-9-231-1811-24"));

        assertEquals("Vigente", foundAddendum.get().getCextStatus());
    }

    @Test
    public void findAddendumsOfACorporateGroup()
    {
        List<String> addendumsUnderAGroup = addendumRepository
                .findContractExtensionsOfAGroup("CORP TURJR-4-428454");

        String[] addendumInfo = addendumsUnderAGroup.get(0).split(",");

        assertEquals("CONTR-EXT-9-231-2011-27",addendumInfo[2]);
    }

    @Test
    public void findAddendumsOfAClientById()
    {
        List<String> addendumsUnderAClient = addendumRepository.findContractExtensionsByClientId("CLIENT-4-468-465454");

        String[] verifyFetchedData = addendumsUnderAClient.get(1).split(",");

        assertEquals(4, addendumsUnderAClient.size());
        assertEquals("CONTR-EXT-10-231-1231-23", verifyFetchedData[3]);

    }

    @Test
    public void findAddendumsOfAClientByName()
    {
        List<String> addendumsUnderAClient = addendumRepository
                .findContractExtensionsByClientName("OfficialName client 1");

        String[] verifyData = addendumsUnderAClient.get(0).split(",");

        DecimalFormat df = new DecimalFormat("#.00"); //Necessary for the test to succeed.

        assertEquals(df.format(45000.00), verifyData[9]);
    }

    @Test
    public void filterClientsAddendumsByStatus()
    {
        List<String> filteredAddendumsUnderAClient = addendumRepository
                .filterAClientsExtensionsByStatus("CLIENT-4-468-465454", "Vigente");

        assertEquals(3, filteredAddendumsUnderAClient.size());
    }

    @Test
    public void insertNewAddendumUpdateItThenDeleteIt()
    {
        ContractExtension testAddendum = new ContractExtension("CONTRACT-10-268-552-245",
                "TestExtension",Date.valueOf("2012-03-20"), Date.valueOf("2014-06-15"),Date.valueOf("2014-07-20"),
                "Terminado", 109888.99, 78888.99);

        addendumRepository.save(testAddendum);

        testAddendum.setCextInvoicedCost(99999.99);

        addendumRepository.save(testAddendum);

        assertEquals(99999.99, addendumRepository
                .findById(new ContractExtensionKey("CONTRACT-10-268-552-245", "TestExtension"))
                .get().getCextInvoicedCost());

        addendumRepository.delete(testAddendum);
    }
}
