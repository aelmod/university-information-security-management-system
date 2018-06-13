package information.security.management.system.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Department.
 */
@Entity
@Table(name = "department")
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "building")
    private String building;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "room")
    private String room;

    @OneToMany(mappedBy = "department")
    @JsonIgnore
    private Set<Employee> employees = new HashSet<>();

    @OneToMany(mappedBy = "department")
    @JsonIgnore
    private Set<Incident> incidents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBuilding() {
        return building;
    }

    public Department building(String building) {
        this.building = building;
        return this;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public Department departmentName(String departmentName) {
        this.departmentName = departmentName;
        return this;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getRoom() {
        return room;
    }

    public Department room(String room) {
        this.room = room;
        return this;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public Department employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public Department addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.setDepartment(this);
        return this;
    }

    public Department removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.setDepartment(null);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Set<Incident> getIncidents() {
        return incidents;
    }

    public Department incidents(Set<Incident> incidents) {
        this.incidents = incidents;
        return this;
    }

    public Department addIncident(Incident incident) {
        this.incidents.add(incident);
        incident.setDepartment(this);
        return this;
    }

    public Department removeIncident(Incident incident) {
        this.incidents.remove(incident);
        incident.setDepartment(null);
        return this;
    }

    public void setIncidents(Set<Incident> incidents) {
        this.incidents = incidents;
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
        Department department = (Department) o;
        if (department.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), department.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Department{" +
            "id=" + getId() +
            ", building='" + getBuilding() + "'" +
            ", departmentName='" + getDepartmentName() + "'" +
            ", room='" + getRoom() + "'" +
            "}";
    }
}
