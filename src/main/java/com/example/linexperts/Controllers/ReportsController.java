package com.example.linexperts.Controllers;

import com.example.linexperts.Repositories.MiscReportsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class ReportsController {

    @Autowired
    private MiscReportsRepository reportsRepository;

    @GetMapping("/reports/top10/contracts")
    public List<String> topTenMostExpensiveContracts()
    {
        return reportsRepository.topTenMostExpensiveContractsOfThePastYear();
    }

    @GetMapping("/reports/top10/services")
    public List<String> topTenServicesInDemand()
    {
        return reportsRepository.topTenMostInDemandServicesOfThePastYear();
    }

}
