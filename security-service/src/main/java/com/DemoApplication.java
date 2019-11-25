package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        roleRepository.deleteAll();
        privilageRepository.deleteAll();
        userRepository.deleteAll();

        Privilege EDIT_PROFILE = privilageRepository.save(new Privilege("EDIT_PROFILE"));
        Privilege READ_PROFILE = privilageRepository.save(new Privilege("READ_PROFILE"));
        Privilege DELETE_PROFILE = privilageRepository.save(new Privilege("DELETE_PROFILE"));

        Privilege EDIT_USE = privilageRepository.save(new Privilege("EDIT_USE"));
        Privilege READ_USE = privilageRepository.save(new Privilege("READ_USE"));
        Privilege DELETE_USE = privilageRepository.save(new Privilege("DELETE_USE"));

        Role ROLE_ADMIN = roleRepository.save(new Role("ROLE_ADMIN",
                Arrays.asList(
                        EDIT_PROFILE,
                        READ_PROFILE,
                        DELETE_PROFILE,
                        EDIT_USE,
                        READ_USE,
                        DELETE_USE
                )));
        Role ROLE_USER = roleRepository.save(new Role("ROLE_USER", Arrays.asList(
                READ_PROFILE,
                READ_USE
        )));
        userRepository.save(new User(
                "admin",
                myBCryptPasswordEncoder.encode("0000"),
                Arrays.asList(ROLE_ADMIN, ROLE_USER)
        ));
        userRepository.save(new User(
                "user",
                myBCryptPasswordEncoder.encode("0000"),
                Arrays.asList(ROLE_USER)
        ));

    }
}
