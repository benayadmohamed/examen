package com.dao;

import com.entities.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Collection;

@RepositoryRestResource(path = "clients")
public interface ClientRepository extends MongoRepository<Client, String> {

    @RestResource(path = "params", rel = "params")
    public Page findByNomStartsWith(@Param("nom") String nom, Pageable p);

    public Collection<Client> findByNomStartsWith(@Param("nom") String nom);
}
