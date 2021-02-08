package com.example.linexperts.services;

import com.example.linexperts.Models.LinexpertsUser;
import com.example.linexperts.Requestmodels.SingingUpUserRequestModel;
import com.example.linexperts.Requestmodels.UserUpdateRequestModel;
import com.example.linexperts.respenseModels.UserRespenseModel;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService extends UserDetailsService {

    public UserRespenseModel createUser(SingingUpUserRequestModel user);

    public LinexpertsUser getUser(String email);

    public LinexpertsUser getUserById(String userId);

    public LinexpertsUser updateUser(String userId, UserUpdateRequestModel user);

}
