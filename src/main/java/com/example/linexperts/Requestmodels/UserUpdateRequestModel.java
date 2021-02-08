package com.example.linexperts.Requestmodels;

import com.example.linexperts.Models.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequestModel {

    private String lastName;

    private String firstName;

    private String email;

    private String password;

    private Role role;

}
