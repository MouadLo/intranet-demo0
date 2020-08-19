package io.miage.intanet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Etudiant.
 */
@Entity
@Table(name = "etudiant")
public class Etudiant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cne")
    private String cne;

    @ManyToOne
    @JsonIgnoreProperties("etudiants")
    private Group group;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCne() {
        return cne;
    }

    public Etudiant cne(String cne) {
        this.cne = cne;
        return this;
    }

    public void setCne(String cne) {
        this.cne = cne;
    }

    public Group getGroup() {
        return group;
    }

    public Etudiant group(Group group) {
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
        if (!(o instanceof Etudiant)) {
            return false;
        }
        return id != null && id.equals(((Etudiant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Etudiant{" +
            "id=" + getId() +
            ", cne='" + getCne() + "'" +
            "}";
    }
}
