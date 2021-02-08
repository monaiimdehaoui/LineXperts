package com.example.linexperts.servicesImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.linexperts.Models.LinexpertsUser;
import com.example.linexperts.Models.Privileges;
import com.example.linexperts.Models.Role;
import com.example.linexperts.Repositories.IRoleRepository;
import com.example.linexperts.Repositories.IUserRepository;
import com.example.linexperts.Requestmodels.SingingUpUserRequestModel;
import com.example.linexperts.Requestmodels.UserUpdateRequestModel;
import com.example.linexperts.respenseModels.UserRespenseModel;
import com.example.linexperts.services.IUserService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptPasswordEncoder;

    @Override
    public UserRespenseModel createUser(SingingUpUserRequestModel user) {

        UserRespenseModel userres = new UserRespenseModel();
        LinexpertsUser registredUser = new LinexpertsUser();
        String useremail = user.getEmail();

        // searching for User with the same Email adress in database
        Optional<LinexpertsUser> userexists = userRepository.findUserByEmail(useremail);

        // in case we have a user with the same email
        if (userexists.isPresent()) {
            throw new RuntimeException("user already exists");
        }

        // in case we dont have a similar Email
        else {

            // passing user attributes values to User object
            BeanUtils.copyProperties(user, registredUser);
            registredUser.setEncryptePassword(bcryptPasswordEncoder.encode(user.getPassword()));

            Optional<Role> role = this.roleRepository.findRoleByName(user.getRole().getName());
            if (role.isPresent()) {
                registredUser.setRole(role.get());
            } else {
                throw new RuntimeException(
                        "this role doesnt exist please try role with the following names : ACCOUNTING, OPERATION_MANAGMENT or GENERAL_MANAGMENT");
            }

            // saving User
            registredUser = this.userRepository.save(registredUser);
            userres.setEmail(registredUser.getEmail());
            userres.setLastName(registredUser.getLastName());
            userres.setFirstName(registredUser.getFirstName());
            userres.setRole(registredUser.getRole());

        }
        return userres;
    }

    @Override
    public LinexpertsUser getUser(String email) {
        Optional<LinexpertsUser> userOptional = userRepository.findUserByEmail(email);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else
            throw new RuntimeException("No user with the given Email");
    }

    @Override
    public LinexpertsUser getUserById(String userId) {
        LinexpertsUser userEntity = userRepository.findById(userId).get();
        if (userEntity == null)
            throw new UsernameNotFoundException(userId);

        return userEntity;
    }

    @Override
    public LinexpertsUser updateUser(String userId, UserUpdateRequestModel user) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<LinexpertsUser> userOptional = userRepository.findUserByEmail(email);
        LinexpertsUser user = null;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getEncryptePassword(),
                    getAuthorities(user.getRole()));
        } else
            throw new RuntimeException("No user with the given Email");
    }

    private List<? extends GrantedAuthority> getAuthorities(Role role) {

        return getGrantedAuthorities(getPrivileges(role));
    }

    private List<String> getPrivileges(Role role) {

        List<String> privileges = new ArrayList<>();
        for (Privileges item : role.getPrivileges()) {
            privileges.add(item.getName());
        }
        return privileges;
    }

    private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String privilege : privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege));
        }
        return authorities;
    }
}