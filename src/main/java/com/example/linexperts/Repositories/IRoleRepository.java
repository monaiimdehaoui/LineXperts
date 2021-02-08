package com.example.linexperts.Repositories;

import java.util.Optional;

import com.example.linexperts.Models.Role;
import com.example.linexperts.Utils.enums.RolesEnum;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends CrudRepository<Role, String> {

    public Optional<Role> findRoleByName(RolesEnum name);

}