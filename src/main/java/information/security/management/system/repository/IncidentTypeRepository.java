package information.security.management.system.repository;

import information.security.management.system.domain.IncidentType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the IncidentType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncidentTypeRepository extends JpaRepository<IncidentType, Long> {

}
