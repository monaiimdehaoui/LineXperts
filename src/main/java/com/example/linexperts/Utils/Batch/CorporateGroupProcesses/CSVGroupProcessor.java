package com.example.linexperts.Utils.Batch.CorporateGroupProcesses;

import com.example.linexperts.Models.CorporateGroup;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Component
public class CSVGroupProcessor implements ItemProcessor<CorporateGroup, CorporateGroup> {
    @Override
    public CorporateGroup process(CorporateGroup corporateGroup) throws Exception {
        return corporateGroup;
    }
}
