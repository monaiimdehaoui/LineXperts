package com.example.linexperts.Controllers;

import com.example.linexperts.Requestmodels.SingingUpUserRequestModel;
import com.example.linexperts.respenseModels.UserRespenseModel;
import com.example.linexperts.services.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping("sign-up")
    public UserRespenseModel registerUser(@RequestBody SingingUpUserRequestModel userModel) {

        return this.userService.createUser(userModel);
    }

}
