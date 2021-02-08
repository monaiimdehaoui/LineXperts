package com.example.linexperts;

import com.example.linexperts.Models.ServiceByContract;
import com.example.linexperts.Repositories.ServiceByContractRepository;
import com.example.linexperts.Utils.CompositeKeyUtils.ServiceByContractKey;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;
import java.sql.Date;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ServiceOnContractTest {

    @Autowired
    private ServiceByContractRepository sbcRepository;

    @Test
    public void findAll()
    {
        List<ServiceByContract> allSbc = (List<ServiceByContract>) sbcRepository.findAll();

        assertEquals(25, allSbc.size());
    }

    @Test
    public void findARecord()
    {
        Optional<ServiceByContract> foundSbc = sbcRepository
                .findById(new ServiceByContractKey("CONTRACT-5-778-888-887",
                "CONTR-EXT-4-231-4517-23", 4));

        assertEquals("CONTRACT-5-778-888-887", foundSbc.get().getConId());
    }

    @Test
    public void findServicesUnderAContract()
    {
        List<String> searchServicesForAContract = sbcRepository
                .viewServicesUnderAContract("CONTRACT-1-428-346-215");

        String[] serviceInfo = searchServicesForAContract.get(0).split(",");

        assertEquals("Optimazation of Business processes", serviceInfo[3]);
    }

    @Test
    public void findServicesUnderAContractFilteredByDate()
    {

        String dateAsAString ="2019-03-01";
        Date dateParam = Date.valueOf(dateAsAString);

        List<String> servicesForAContractFiltered = sbcRepository
                .findServicesUnderAContractByStartDate("CONTRACT-10-268-552-245",
                                                        dateParam);

        assertEquals(2, servicesForAContractFiltered.size());
    }

    @Test
    public void searchForAServicesAcrossContractsBySerId()
    {
        List<String> serviceAcrossContracts = sbcRepository.viewOneServiceAcrossContracts(5);

        assertEquals(4, serviceAcrossContracts.size());
    }

    @Test
    public void searchForAServicesAcrossContractsBySerName()
    {
        //Same service as above
        List<String> serviceAcrossContracts = sbcRepository
                .viewOneServiceAcrossContractsSearchName("Optimazation of Business processes");

        assertEquals(4, serviceAcrossContracts.size());
    }

    @Test
    public void listServicesUnderAClient()
    {
        List<String> servicesUnderClient = sbcRepository.viewServicesContractedByAClient("CLIENT-2-468-465454");

        assertEquals(1, servicesUnderClient.size());
    }

    @Test
    public void listServicesByIdAndContractStatus()
    {
        List<String> servicesAcrossContractsFilteredByContractStatus = sbcRepository
                .filterServicesByContractStatus(2, "Vigente");

        assertEquals(11, servicesAcrossContractsFilteredByContractStatus.size());
    }

    //Update is useless in this entity. If there's an error, delete the entry and re-enter it.
    @Test
    public void InsertNewServiceThenDelteIt()
    {
        String startDate = "2020-12-24";
        String endDate = "2021-04-02";
        ServiceByContract testService = new ServiceByContract("CONTRACT-10-268-552-245",
                "CONTR-EXT-7-285-1231-23", 6, Date.valueOf(startDate), Date.valueOf(endDate));

        sbcRepository.save(testService);

        assertEquals(6, sbcRepository
                .findById(new ServiceByContractKey
                        ("CONTRACT-10-268-552-245", "CONTR-EXT-7-285-1231-23",6)).get().getSerId());

        sbcRepository.delete(testService);
    }


}
