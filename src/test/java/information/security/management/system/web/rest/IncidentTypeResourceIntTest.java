package information.security.management.system.web.rest;

import information.security.management.system.JhipsterApp;

import information.security.management.system.domain.IncidentType;
import information.security.management.system.repository.IncidentTypeRepository;
import information.security.management.system.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static information.security.management.system.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IncidentTypeResource REST controller.
 *
 * @see IncidentTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class IncidentTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private IncidentTypeRepository incidentTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIncidentTypeMockMvc;

    private IncidentType incidentType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IncidentTypeResource incidentTypeResource = new IncidentTypeResource(incidentTypeRepository);
        this.restIncidentTypeMockMvc = MockMvcBuilders.standaloneSetup(incidentTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IncidentType createEntity(EntityManager em) {
        IncidentType incidentType = new IncidentType()
            .name(DEFAULT_NAME);
        return incidentType;
    }

    @Before
    public void initTest() {
        incidentType = createEntity(em);
    }

    @Test
    @Transactional
    public void createIncidentType() throws Exception {
        int databaseSizeBeforeCreate = incidentTypeRepository.findAll().size();

        // Create the IncidentType
        restIncidentTypeMockMvc.perform(post("/api/incident-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incidentType)))
            .andExpect(status().isCreated());

        // Validate the IncidentType in the database
        List<IncidentType> incidentTypeList = incidentTypeRepository.findAll();
        assertThat(incidentTypeList).hasSize(databaseSizeBeforeCreate + 1);
        IncidentType testIncidentType = incidentTypeList.get(incidentTypeList.size() - 1);
        assertThat(testIncidentType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createIncidentTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = incidentTypeRepository.findAll().size();

        // Create the IncidentType with an existing ID
        incidentType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIncidentTypeMockMvc.perform(post("/api/incident-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incidentType)))
            .andExpect(status().isBadRequest());

        // Validate the IncidentType in the database
        List<IncidentType> incidentTypeList = incidentTypeRepository.findAll();
        assertThat(incidentTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIncidentTypes() throws Exception {
        // Initialize the database
        incidentTypeRepository.saveAndFlush(incidentType);

        // Get all the incidentTypeList
        restIncidentTypeMockMvc.perform(get("/api/incident-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(incidentType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getIncidentType() throws Exception {
        // Initialize the database
        incidentTypeRepository.saveAndFlush(incidentType);

        // Get the incidentType
        restIncidentTypeMockMvc.perform(get("/api/incident-types/{id}", incidentType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(incidentType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIncidentType() throws Exception {
        // Get the incidentType
        restIncidentTypeMockMvc.perform(get("/api/incident-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIncidentType() throws Exception {
        // Initialize the database
        incidentTypeRepository.saveAndFlush(incidentType);
        int databaseSizeBeforeUpdate = incidentTypeRepository.findAll().size();

        // Update the incidentType
        IncidentType updatedIncidentType = incidentTypeRepository.findOne(incidentType.getId());
        // Disconnect from session so that the updates on updatedIncidentType are not directly saved in db
        em.detach(updatedIncidentType);
        updatedIncidentType
            .name(UPDATED_NAME);

        restIncidentTypeMockMvc.perform(put("/api/incident-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIncidentType)))
            .andExpect(status().isOk());

        // Validate the IncidentType in the database
        List<IncidentType> incidentTypeList = incidentTypeRepository.findAll();
        assertThat(incidentTypeList).hasSize(databaseSizeBeforeUpdate);
        IncidentType testIncidentType = incidentTypeList.get(incidentTypeList.size() - 1);
        assertThat(testIncidentType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingIncidentType() throws Exception {
        int databaseSizeBeforeUpdate = incidentTypeRepository.findAll().size();

        // Create the IncidentType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIncidentTypeMockMvc.perform(put("/api/incident-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incidentType)))
            .andExpect(status().isCreated());

        // Validate the IncidentType in the database
        List<IncidentType> incidentTypeList = incidentTypeRepository.findAll();
        assertThat(incidentTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIncidentType() throws Exception {
        // Initialize the database
        incidentTypeRepository.saveAndFlush(incidentType);
        int databaseSizeBeforeDelete = incidentTypeRepository.findAll().size();

        // Get the incidentType
        restIncidentTypeMockMvc.perform(delete("/api/incident-types/{id}", incidentType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IncidentType> incidentTypeList = incidentTypeRepository.findAll();
        assertThat(incidentTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IncidentType.class);
        IncidentType incidentType1 = new IncidentType();
        incidentType1.setId(1L);
        IncidentType incidentType2 = new IncidentType();
        incidentType2.setId(incidentType1.getId());
        assertThat(incidentType1).isEqualTo(incidentType2);
        incidentType2.setId(2L);
        assertThat(incidentType1).isNotEqualTo(incidentType2);
        incidentType1.setId(null);
        assertThat(incidentType1).isNotEqualTo(incidentType2);
    }
}
