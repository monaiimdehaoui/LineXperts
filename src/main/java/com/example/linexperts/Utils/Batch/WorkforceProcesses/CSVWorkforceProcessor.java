package com.example.linexperts.Utils.Batch.WorkforceProcesses;

import com.example.linexperts.Models.Workforce;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Component
public class CSVWorkforceProcessor implements ItemProcessor<Workforce, Workforce> {

    @Override
    public Workforce process(Workforce workforce) throws Exception {
        return workforce;
    }
}
