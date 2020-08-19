package io.miage.intanet.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Horaire.
 */
@Entity
@Table(name = "horaire")
public class Horaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "heure_depart")
    private Instant heureDepart;

    @Column(name = "heure_fin")
    private Instant heureFin;

    @Column(name = "date_jour")
    private Instant dateJour;

    @OneToMany(mappedBy = "horaire")
    private Set<Matiere> matieres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getHeureDepart() {
        return heureDepart;
    }

    public Horaire heureDepart(Instant heureDepart) {
        this.heureDepart = heureDepart;
        return this;
    }

    public void setHeureDepart(Instant heureDepart) {
        this.heureDepart = heureDepart;
    }

    public Instant getHeureFin() {
        return heureFin;
    }

    public Horaire heureFin(Instant heureFin) {
        this.heureFin = heureFin;
        return this;
    }

    public void setHeureFin(Instant heureFin) {
        this.heureFin = heureFin;
    }

    public Instant getDateJour() {
        return dateJour;
    }

    public Horaire dateJour(Instant dateJour) {
        this.dateJour = dateJour;
        return this;
    }

    public void setDateJour(Instant dateJour) {
        this.dateJour = dateJour;
    }

    public Set<Matiere> getMatieres() {
        return matieres;
    }

    public Horaire matieres(Set<Matiere> matieres) {
        this.matieres = matieres;
        return this;
    }

    public Horaire addMatiere(Matiere matiere) {
        this.matieres.add(matiere);
        matiere.setHoraire(this);
        return this;
    }

    public Horaire removeMatiere(Matiere matiere) {
        this.matieres.remove(matiere);
        matiere.setHoraire(null);
        return this;
    }

    public void setMatieres(Set<Matiere> matieres) {
        this.matieres = matieres;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Horaire)) {
            return false;
        }
        return id != null && id.equals(((Horaire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Horaire{" +
            "id=" + getId() +
            ", heureDepart='" + getHeureDepart() + "'" +
            ", heureFin='" + getHeureFin() + "'" +
            ", dateJour='" + getDateJour() + "'" +
            "}";
    }
}
