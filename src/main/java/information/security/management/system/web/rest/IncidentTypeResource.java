package information.security.management.system.web.rest;

import com.codahale.metrics.annotation.Timed;
import information.security.management.system.domain.IncidentType;

import information.security.management.system.repository.IncidentTypeRepository;
import information.security.management.system.web.rest.errors.BadRequestAlertException;
import information.security.management.system.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing IncidentType.
 */
@RestController
@RequestMapping("/api")
public class IncidentTypeResource {

    private final Logger log = LoggerFactory.getLogger(IncidentTypeResource.class);

    private static final String ENTITY_NAME = "incidentType";

    private final IncidentTypeRepository incidentTypeRepository;

    public IncidentTypeResource(IncidentTypeRepository incidentTypeRepository) {
        this.incidentTypeRepository = incidentTypeRepository;
    }

    /**
     * POST  /incident-types : Create a new incidentType.
     *
     * @param incidentType the incidentType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new incidentType, or with status 400 (Bad Request) if the incidentType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/incident-types")
    @Timed
    public ResponseEntity<IncidentType> createIncidentType(@RequestBody IncidentType incidentType) throws URISyntaxException {
        log.debug("REST request to save IncidentType : {}", incidentType);
        if (incidentType.getId() != null) {
            throw new BadRequestAlertException("A new incidentType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IncidentType result = incidentTypeRepository.save(incidentType);
        return ResponseEntity.created(new URI("/api/incident-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /incident-types : Updates an existing incidentType.
     *
     * @param incidentType the incidentType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated incidentType,
     * or with status 400 (Bad Request) if the incidentType is not valid,
     * or with status 500 (Internal Server Error) if the incidentType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/incident-types")
    @Timed
    public ResponseEntity<IncidentType> updateIncidentType(@RequestBody IncidentType incidentType) throws URISyntaxException {
        log.debug("REST request to update IncidentType : {}", incidentType);
        if (incidentType.getId() == null) {
            return createIncidentType(incidentType);
        }
        IncidentType result = incidentTypeRepository.save(incidentType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, incidentType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /incident-types : get all the incidentTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of incidentTypes in body
     */
    @GetMapping("/incident-types")
    @Timed
    public List<IncidentType> getAllIncidentTypes() {
        log.debug("REST request to get all IncidentTypes");
        return incidentTypeRepository.findAll();
        }

    /**
     * GET  /incident-types/:id : get the "id" incidentType.
     *
     * @param id the id of the incidentType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the incidentType, or with status 404 (Not Found)
     */
    @GetMapping("/incident-types/{id}")
    @Timed
    public ResponseEntity<IncidentType> getIncidentType(@PathVariable Long id) {
        log.debug("REST request to get IncidentType : {}", id);
        IncidentType incidentType = incidentTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(incidentType));
    }

    /**
     * DELETE  /incident-types/:id : delete the "id" incidentType.
     *
     * @param id the id of the incidentType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/incident-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteIncidentType(@PathVariable Long id) {
        log.debug("REST request to delete IncidentType : {}", id);
        incidentTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
