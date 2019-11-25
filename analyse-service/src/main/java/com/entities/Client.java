package com.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Client {
    @Id
    private String id;
    private String nom;
    private String prenom;
    private String src;
    @DBRef
    private Collection<Analyse> analyses;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public Collection<Analyse> getAnalyses() {
        return analyses;
    }

    public void setAnalyses(Collection<Analyse> analyses) {
        this.analyses = analyses;
    }
}
