package com.example.linexperts.respenseModels;

import com.example.linexperts.Models.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRespenseModel {

    private String lastName;

    private String firstName;

    private String email;

    private Role role;
}
