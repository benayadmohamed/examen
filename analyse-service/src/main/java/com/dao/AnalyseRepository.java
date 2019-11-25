package com.dao;

import com.entities.Analyse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AnalyseRepository extends MongoRepository<Analyse,String> {
}
