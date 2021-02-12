package com.example.linexperts.Repositories;

import java.util.Optional;

import com.example.linexperts.Models.LinexpertsUser;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends CrudRepository<LinexpertsUser, String> {
    public Optional<LinexpertsUser> findUserByEmail(String email);
    public LinexpertsUser findById(Integer id);

}
