package com.example.linexperts.Requestmodels;

import com.example.linexperts.Models.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SingingUpUserRequestModel {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Role role;

}
