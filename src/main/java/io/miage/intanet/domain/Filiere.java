package io.miage.intanet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Filiere.
 */
@Entity
@Table(name = "filiere")
public class Filiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom_filiere")
    private String nomFiliere;

    @Column(name = "abreviation")
    private String abreviation;

    @ManyToOne
    @JsonIgnoreProperties("filieres")
    private Group group;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomFiliere() {
        return nomFiliere;
    }

    public Filiere nomFiliere(String nomFiliere) {
        this.nomFiliere = nomFiliere;
        return this;
    }

    public void setNomFiliere(String nomFiliere) {
        this.nomFiliere = nomFiliere;
    }

    public String getAbreviation() {
        return abreviation;
    }

    public Filiere abreviation(String abreviation) {
        this.abreviation = abreviation;
        return this;
    }

    public void setAbreviation(String abreviation) {
        this.abreviation = abreviation;
    }

    public Group getGroup() {
        return group;
    }

    public Filiere group(Group group) {
        this.group = group;
        return this;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Filiere)) {
            return false;
        }
        return id != null && id.equals(((Filiere) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Filiere{" +
            "id=" + getId() +
            ", nomFiliere='" + getNomFiliere() + "'" +
            ", abreviation='" + getAbreviation() + "'" +
            "}";
    }
}
