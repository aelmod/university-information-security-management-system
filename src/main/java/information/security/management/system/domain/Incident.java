package information.security.management.system.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Incident.
 */
@Entity
@Table(name = "incident")
public class Incident implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Department department;

    @ManyToOne
    private IncidentType incidentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Incident description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Incident employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Department getDepartment() {
        return department;
    }

    public Incident department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public IncidentType getIncidentType() {
        return incidentType;
    }

    public Incident incidentType(IncidentType incidentType) {
        this.incidentType = incidentType;
        return this;
    }

    public void setIncidentType(IncidentType incidentType) {
        this.incidentType = incidentType;
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
        Incident incident = (Incident) o;
        if (incident.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), incident.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Incident{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
