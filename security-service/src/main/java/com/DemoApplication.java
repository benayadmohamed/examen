package com;

import com.configs.security.MyBCryptPasswordEncoder;
import com.models.Privilege;
import com.models.Role;
import com.models.User;
import com.repositories.PrivilageRepository;
import com.repositories.RoleRepository;
import com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PrivilageRepository privilageRepository;
    @Autowired
    private MyBCryptPasswordEncoder myBCryptPasswordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        roleRepository.deleteAll();
        privilageRepository.deleteAll();
        userRepository.deleteAll();

        Privilege EDIT_CLIENT = privilageRepository.save(new Privilege("EDIT_CLIENT"));
        Privilege READ_CLIENT = privilageRepository.save(new Privilege("READ_CLIENT"));
        Privilege DELETE_CLIENT = privilageRepository.save(new Privilege("DELETE_CLIENT"));

        Privilege EDIT_ANALYSE = privilageRepository.save(new Privilege("EDIT_ANALYSE"));
        Privilege READ_ANALYSE = privilageRepository.save(new Privilege("READ_ANALYSE"));
        Privilege DELETE_ANALYSE = privilageRepository.save(new Privilege("DELETE_ANALYSE"));

        Privilege EDIT_USER = privilageRepository.save(new Privilege("EDIT_USER"));
        Privilege READ_USER = privilageRepository.save(new Privilege("READ_USER"));
        Privilege DELETE_USER = privilageRepository.save(new Privilege("DELETE_USER"));

        Role ROLE_ANALYSE_MANAGER = roleRepository.save(new Role("ROLE_ANALYSE_MANAGER",
                Arrays.asList(
                        EDIT_ANALYSE,
                        READ_ANALYSE,
                        DELETE_ANALYSE,
                        EDIT_CLIENT,
                        READ_CLIENT,
                        DELETE_CLIENT
                )));
        Role ROLE_ADMIN = roleRepository.save(new Role("ROLE_ADMIN",
                Arrays.asList(
                        EDIT_ANALYSE,
                        READ_ANALYSE,
                        DELETE_ANALYSE,
                        EDIT_CLIENT,
                        READ_CLIENT,
                        DELETE_CLIENT,
                        EDIT_USER,
                        READ_USER,
                        DELETE_USER
                )));
        Role ROLE_USER = roleRepository.save(new Role("ROLE_USER", Arrays.asList(
                READ_ANALYSE,
                READ_CLIENT
        )));
        userRepository.save(new User(
                "admin",
                myBCryptPasswordEncoder.encode("0000"),
                Arrays.asList(ROLE_ADMIN)
        ));
        userRepository.save(new User(
                "user",
                myBCryptPasswordEncoder.encode("0000"),
                Arrays.asList(ROLE_USER)
        ));
        userRepository.save(new User(
                "manager",
                myBCryptPasswordEncoder.encode("0000"),
                Arrays.asList(ROLE_ANALYSE_MANAGER)
        ));

    }
}
