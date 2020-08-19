package io.miage.intanet.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Group.
 */
@Entity
@Table(name = "jhi_group")
public class Group implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom_group")
    private String nomGroup;

    @Column(name = "abreviation")
    private String abreviation;

    @Column(name = "niveau")
    private String niveau;

    @OneToMany(mappedBy = "group")
    private Set<Filiere> filieres = new HashSet<>();

    @OneToMany(mappedBy = "group")
    private Set<Etudiant> etudiants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomGroup() {
        return nomGroup;
    }

    public Group nomGroup(String nomGroup) {
        this.nomGroup = nomGroup;
        return this;
    }

    public void setNomGroup(String nomGroup) {
        this.nomGroup = nomGroup;
    }

    public String getAbreviation() {
        return abreviation;
    }

    public Group abreviation(String abreviation) {
        this.abreviation = abreviation;
        return this;
    }

    public void setAbreviation(String abreviation) {
        this.abreviation = abreviation;
    }

    public String getNiveau() {
        return niveau;
    }

    public Group niveau(String niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public Set<Filiere> getFilieres() {
        return filieres;
    }

    public Group filieres(Set<Filiere> filieres) {
        this.filieres = filieres;
        return this;
    }

    public Group addFiliere(Filiere filiere) {
        this.filieres.add(filiere);
        filiere.setGroup(this);
        return this;
    }

    public Group removeFiliere(Filiere filiere) {
        this.filieres.remove(filiere);
        filiere.setGroup(null);
        return this;
    }

    public void setFilieres(Set<Filiere> filieres) {
        this.filieres = filieres;
    }

    public Set<Etudiant> getEtudiants() {
        return etudiants;
    }

    public Group etudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
        return this;
    }

    public Group addEtudiant(Etudiant etudiant) {
        this.etudiants.add(etudiant);
        etudiant.setGroup(this);
        return this;
    }

    public Group removeEtudiant(Etudiant etudiant) {
        this.etudiants.remove(etudiant);
        etudiant.setGroup(null);
        return this;
    }

    public void setEtudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Group)) {
            return false;
        }
        return id != null && id.equals(((Group) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Group{" +
            "id=" + getId() +
            ", nomGroup='" + getNomGroup() + "'" +
            ", abreviation='" + getAbreviation() + "'" +
            ", niveau='" + getNiveau() + "'" +
            "}";
    }
}
