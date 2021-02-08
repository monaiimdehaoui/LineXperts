package com.example.linexperts.Utils.Batch.ServiceProcesses;

import com.example.linexperts.Models.Services;
import com.example.linexperts.Repositories.ServicesRepository;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.*;

@Component
public class DBServiceWriter implements ItemWriter<Services> {

    @Autowired
    private ServicesRepository servicesRepository;


    @Override
    public void write(List<? extends Services> servicesInCSV) throws Exception
    {
        List<Services> existingServices = (List<Services>) servicesRepository.findAll();

        List<Services> duplicateServices = new ArrayList<>();

        for(Iterator<Services> servicesIterator = (Iterator<Services>) servicesInCSV.iterator();
            servicesIterator.hasNext();)
        {
            Services s = servicesIterator.next();

            for(int i = 0; i < existingServices.size(); i++)
            {
                //Record exists. Update information.
                if(s.getSerName().equalsIgnoreCase(existingServices.get(i).getSerName()))
                {
                    existingServices.get(i).setSerTariff(s.getSerTariff());
                    existingServices.get(i).setSerUnit(s.getSerUnit());
                    existingServices.get(i).setSerDescription(s.getSerDescription());

                    duplicateServices.add(s);
                    existingServices.removeAll(duplicateServices);
                }

                else
                {
                    existingServices.removeAll(duplicateServices);
                    existingServices.add(s);
                    break;
                }
            }
        }
       servicesRepository.saveAll(existingServices);
    }
}
