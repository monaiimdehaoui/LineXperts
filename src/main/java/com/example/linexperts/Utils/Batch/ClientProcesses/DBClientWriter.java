package com.example.linexperts.Utils.Batch.ClientProcesses;

import com.example.linexperts.Models.Client;
import com.example.linexperts.Repositories.ClientRepository;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DBClientWriter implements ItemWriter<Client> {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public void write(List<? extends Client> clientsInCSV) throws Exception {

        List<Client> existingClients = (List<Client>) clientRepository.findAll();

        List<Client> duplicateClients = new ArrayList<>();

        for(Iterator<Client> clientIterator = (Iterator<Client>) clientsInCSV.iterator();
            clientIterator.hasNext();) {

            Client cl = clientIterator.next();

            for(int i = 0; i < existingClients.size(); i++) {

                //Record exists. Update information
                if(cl.getCltId().equalsIgnoreCase(existingClients.get(i).getCltId())
                && cl.getGroupId().equalsIgnoreCase(existingClients.get(i).getGroupId()))
                {
                    existingClients.get(i).setCltCommercialName(cl.getCltCommercialName());
                    existingClients.get(i).setCltEmailAddr(cl.getCltEmailAddr());
                    existingClients.get(i).setCltFirstName(cl.getCltFirstName());
                    existingClients.get(i).setCltLastName(cl.getCltLastName());
                    existingClients.get(i).setCltAddress(cl.getCltAddress());
                    existingClients.get(i).setCltCountry(cl.getCltCountry());
                    existingClients.get(i).setCltCity(cl.getCltCity());
                    existingClients.get(i).setCltRegion(cl.getCltRegion());
                    existingClients.get(i).setCltStatus(cl.getCltStatus());

                    duplicateClients.add(cl);
                    existingClients.removeAll(duplicateClients);

                }

                else
                {
                    existingClients.removeAll(duplicateClients);
                    existingClients.add(cl);
                    break;
                }
            }
        }
        clientRepository.saveAll(existingClients);
    }
}
