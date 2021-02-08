package com.example.linexperts.Utils.Batch.ServiceProcesses;

import com.example.linexperts.Models.Services;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Component
public class CSVServiceProcessor implements ItemProcessor<Services, Services> {

    @Override
    public Services process(Services services) throws Exception {
        return services;
    }
}
