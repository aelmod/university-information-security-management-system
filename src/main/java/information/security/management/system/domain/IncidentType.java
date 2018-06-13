package information.security.management.system.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A IncidentType.
 */
@Entity
@Table(name = "incident_type")
public class IncidentType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "incidentType")
    @JsonIgnore
    private Set<Incident> incedents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public IncidentType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Incident> getIncedents() {
        return incedents;
    }

    public IncidentType incedents(Set<Incident> incidents) {
        this.incedents = incidents;
        return this;
    }

    public IncidentType addIncedent(Incident incident) {
        this.incedents.add(incident);
        incident.setIncidentType(this);
        return this;
    }

    public IncidentType removeIncedent(Incident incident) {
        this.incedents.remove(incident);
        incident.setIncidentType(null);
        return this;
    }

    public void setIncedents(Set<Incident> incidents) {
        this.incedents = incidents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        IncidentType incidentType = (IncidentType) o;
        if (incidentType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), incidentType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IncidentType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
