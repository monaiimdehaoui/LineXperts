package com.example.linexperts;

import com.example.linexperts.Repositories.WorkforceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Initializer implements CommandLineRunner {

    @Autowired
    private final WorkforceRepository repository;

    public Initializer(WorkforceRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
       repository.findAll().forEach(System.out::println);
    }
}
