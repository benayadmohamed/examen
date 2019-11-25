package com.dao;

import com.entities.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

//@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.DELETE})
@RepositoryRestResource(path = "clients")
public interface ClientRepository extends MongoRepository<Client, String> {
//    /people/search/nameStartsWith?name=
//    @RestResource(path = "nameStartsWith", rel = "nameStartsWith")
//public Page findByNameStartsWith(@Param("name") String name, Pageable p);

/*
    @Query("Select t from Data t " +
            "where " +
            "(:name IS NULL or t.name like :name) AND " +
            "(:age IS NULL or t.age = :age) AND " +
            "(:address IS NULL or t.address = :address) AND " +
            "(:etc IS NULL or t.etc= :etc)")
    @RestResource(path = "all", rel = "all")
    Page findByAll(@Param("name") String name, @Param("age") String age,
                   @Param("address") String address, @Param("etc") String etc, Page page);*/

    @RestResource(path = "params", rel = "params")
    public Page findByNomStartsWith(@Param("nom") String nom, Pageable p);
}
