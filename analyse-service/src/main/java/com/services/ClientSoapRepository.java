package com.services;

import com.dao.ClientRepository;
import com.entities.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class ClientSoapRepository {
    @Autowired
    ClientRepository clientRepository;

    public Collection<Client> findCountry(String name) {
        return clientRepository.findByNomStartsWith(name);
    }
}
