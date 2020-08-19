package io.miage.intanet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Matiere.
 */
@Entity
@Table(name = "matiere")
public class Matiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom_matiere")
    private String nomMatiere;

    @Column(name = "abreviation")
    private String abreviation;

    @ManyToOne
    @JsonIgnoreProperties("matieres")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("matieres")
    private Horaire horaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomMatiere() {
        return nomMatiere;
    }

    public Matiere nomMatiere(String nomMatiere) {
        this.nomMatiere = nomMatiere;
        return this;
    }

    public void setNomMatiere(String nomMatiere) {
        this.nomMatiere = nomMatiere;
    }

    public String getAbreviation() {
        return abreviation;
    }

    public Matiere abreviation(String abreviation) {
        this.abreviation = abreviation;
        return this;
    }

    public void setAbreviation(String abreviation) {
        this.abreviation = abreviation;
    }

    public User getUser() {
        return user;
    }

    public Matiere user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Horaire getHoraire() {
        return horaire;
    }

    public Matiere horaire(Horaire horaire) {
        this.horaire = horaire;
        return this;
    }

    public void setHoraire(Horaire horaire) {
        this.horaire = horaire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Matiere)) {
            return false;
        }
        return id != null && id.equals(((Matiere) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Matiere{" +
            "id=" + getId() +
            ", nomMatiere='" + getNomMatiere() + "'" +
            ", abreviation='" + getAbreviation() + "'" +
            "}";
    }
}
