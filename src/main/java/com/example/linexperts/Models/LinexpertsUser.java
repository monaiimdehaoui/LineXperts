package com.example.linexperts.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table
public class LinexpertsUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Email
    @Column
    private String lastName;

    @Column
    private String firstName;

    @Email
    @Column(nullable = false, name = "email_address")
    private String email;

    @Column(nullable = false)
    private String encryptePassword;

    @ManyToOne
    private Role role;

}
