package com.example.linexperts.Utils.Batch.ClientProcesses;

import com.example.linexperts.Models.Client;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Component
public class CSVClientProcessor implements ItemProcessor<Client, Client> {
    @Override
    public Client process(Client client) throws Exception {
        return client;
    }
}
