package information.security.management.system.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "alternative_phone_number")
    private String alternativePhoneNumber;

    @Column(name = "city_phone_number")
    private String cityPhoneNumber;

    @Column(name = "fax")
    private String fax;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private Set<Incident> incedents = new HashSet<>();

    @ManyToOne
    private Job job;

    @ManyToOne
    private Department department;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public Employee fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Employee phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAlternativePhoneNumber() {
        return alternativePhoneNumber;
    }

    public Employee alternativePhoneNumber(String alternativePhoneNumber) {
        this.alternativePhoneNumber = alternativePhoneNumber;
        return this;
    }

    public void setAlternativePhoneNumber(String alternativePhoneNumber) {
        this.alternativePhoneNumber = alternativePhoneNumber;
    }

    public String getCityPhoneNumber() {
        return cityPhoneNumber;
    }

    public Employee cityPhoneNumber(String cityPhoneNumber) {
        this.cityPhoneNumber = cityPhoneNumber;
        return this;
    }

    public void setCityPhoneNumber(String cityPhoneNumber) {
        this.cityPhoneNumber = cityPhoneNumber;
    }

    public String getFax() {
        return fax;
    }

    public Employee fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public Employee email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Incident> getIncedents() {
        return incedents;
    }

    public Employee incedents(Set<Incident> incidents) {
        this.incedents = incidents;
        return this;
    }

    public Employee addIncedent(Incident incident) {
        this.incedents.add(incident);
        incident.setEmployee(this);
        return this;
    }

    public Employee removeIncedent(Incident incident) {
        this.incedents.remove(incident);
        incident.setEmployee(null);
        return this;
    }

    public void setIncedents(Set<Incident> incidents) {
        this.incedents = incidents;
    }

    public Job getJob() {
        return job;
    }

    public Employee job(Job job) {
        this.job = job;
        return this;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Department getDepartment() {
        return department;
    }

    public Employee department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
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
        Employee employee = (Employee) o;
        if (employee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", fullName='" + getFullName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", alternativePhoneNumber='" + getAlternativePhoneNumber() + "'" +
            ", cityPhoneNumber='" + getCityPhoneNumber() + "'" +
            ", fax='" + getFax() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
