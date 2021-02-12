package com.example.linexperts.Controllers;

import javax.websocket.server.PathParam;

import com.example.linexperts.Models.LinexpertsUser;
import com.example.linexperts.Requestmodels.SingingUpUserRequestModel;
import com.example.linexperts.respenseModels.UserRespenseModel;
import com.example.linexperts.services.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping("public/sign-up")
    public UserRespenseModel registerUser(@RequestBody SingingUpUserRequestModel userModel) {

        return this.userService.createUser(userModel);
    }
    @GetMapping("v1/user/{id}")
    public LinexpertsUser registerUser(@PathVariable String id) {

        return this.userService.getUserById(Integer.valueOf(id));
    }
}
