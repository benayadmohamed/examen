package com.services;

import com.configs.security.MyBCryptPasswordEncoder;
import com.models.Privilege;
import com.models.Role;
import com.models.User;
import com.repositories.PrivilageRepository;
import com.repositories.RoleRepository;
import com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecurityServices {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MyBCryptPasswordEncoder myBCryptPasswordEncoder;

    @Autowired
    private PrivilageRepository privilageRepository;


}
