package io.miage.intanet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Absence.
 */
@Entity
@Table(name = "absence")
public class Absence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("absences")
    private Etudiant etudiant;

    @ManyToOne
    @JsonIgnoreProperties("absences")
    private Horaire horaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public Absence etudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
        return this;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Horaire getHoraire() {
        return horaire;
    }

    public Absence horaire(Horaire horaire) {
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
        if (!(o instanceof Absence)) {
            return false;
        }
        return id != null && id.equals(((Absence) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Absence{" +
            "id=" + getId() +
            "}";
    }
}
