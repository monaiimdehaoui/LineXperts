package com.example.linexperts.Utils.Batch.WorkforceProcesses;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.example.linexperts.Models.Workforce;
import com.example.linexperts.Repositories.WorkforceRepository;

import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DBWorkforceWriter implements ItemWriter<Workforce> {

    @Autowired
    private WorkforceRepository workforceRepository;

    @Override
    public void write(List<? extends Workforce> workforceInCSV) throws Exception {

        List<Workforce> existingWorkforces = (List<Workforce>) workforceRepository.findAll();

        List<Workforce> duplicateW = new ArrayList<>(); //prevents duplicate records

        for(Iterator<Workforce> iterator = (Iterator<Workforce>) workforceInCSV.iterator();
            iterator.hasNext();)
        {
            Workforce w = iterator.next();
            for(int i = 0; i < existingWorkforces.size(); i++)
            {

                //Record exists. Update the information.
                if(w.getWrkId().equals(existingWorkforces.get(i).getWrkId()))
                {
                    existingWorkforces.get(i).setWrkStatus(w.getWrkStatus());
                    existingWorkforces.get(i).setWrkCity(w.getWrkCity());
                    existingWorkforces.get(i).setWrkRegion(w.getWrkRegion());
                    existingWorkforces.get(i).setWrkPhoneNo(w.getWrkPhoneNo());
                    existingWorkforces.get(i).setWrkCellNo(w.getWrkCellNo());
                    existingWorkforces.get(i).setWrkCountry(w.getWrkCountry());
                    existingWorkforces.get(i).setWrkCorpEmail(w.getWrkCorpEmail());

                    duplicateW.add(w);
                    existingWorkforces.removeAll(duplicateW);
                }

                //New record. Add it.
                else
                {
                    existingWorkforces.removeAll(duplicateW);
                    existingWorkforces.add(w);
                    break;
                }
            }
        }

        workforceRepository.saveAll(existingWorkforces);
    }
}
