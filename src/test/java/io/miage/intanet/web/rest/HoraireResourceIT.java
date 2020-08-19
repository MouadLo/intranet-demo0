package io.miage.intanet.web.rest;

import io.miage.intanet.JhipsterApp;
import io.miage.intanet.domain.Horaire;
import io.miage.intanet.repository.HoraireRepository;
import io.miage.intanet.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static io.miage.intanet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link HoraireResource} REST controller.
 */
@SpringBootTest(classes = JhipsterApp.class)
public class HoraireResourceIT {

    private static final Instant DEFAULT_HEURE_DEPART = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HEURE_DEPART = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_HEURE_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HEURE_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_JOUR = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_JOUR = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private HoraireRepository horaireRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restHoraireMockMvc;

    private Horaire horaire;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HoraireResource horaireResource = new HoraireResource(horaireRepository);
        this.restHoraireMockMvc = MockMvcBuilders.standaloneSetup(horaireResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Horaire createEntity(EntityManager em) {
        Horaire horaire = new Horaire()
            .heureDepart(DEFAULT_HEURE_DEPART)
            .heureFin(DEFAULT_HEURE_FIN)
            .dateJour(DEFAULT_DATE_JOUR);
        return horaire;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Horaire createUpdatedEntity(EntityManager em) {
        Horaire horaire = new Horaire()
            .heureDepart(UPDATED_HEURE_DEPART)
            .heureFin(UPDATED_HEURE_FIN)
            .dateJour(UPDATED_DATE_JOUR);
        return horaire;
    }

    @BeforeEach
    public void initTest() {
        horaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createHoraire() throws Exception {
        int databaseSizeBeforeCreate = horaireRepository.findAll().size();

        // Create the Horaire
        restHoraireMockMvc.perform(post("/api/horaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horaire)))
            .andExpect(status().isCreated());

        // Validate the Horaire in the database
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeCreate + 1);
        Horaire testHoraire = horaireList.get(horaireList.size() - 1);
        assertThat(testHoraire.getHeureDepart()).isEqualTo(DEFAULT_HEURE_DEPART);
        assertThat(testHoraire.getHeureFin()).isEqualTo(DEFAULT_HEURE_FIN);
        assertThat(testHoraire.getDateJour()).isEqualTo(DEFAULT_DATE_JOUR);
    }

    @Test
    @Transactional
    public void createHoraireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = horaireRepository.findAll().size();

        // Create the Horaire with an existing ID
        horaire.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHoraireMockMvc.perform(post("/api/horaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horaire)))
            .andExpect(status().isBadRequest());

        // Validate the Horaire in the database
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHoraires() throws Exception {
        // Initialize the database
        horaireRepository.saveAndFlush(horaire);

        // Get all the horaireList
        restHoraireMockMvc.perform(get("/api/horaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].heureDepart").value(hasItem(DEFAULT_HEURE_DEPART.toString())))
            .andExpect(jsonPath("$.[*].heureFin").value(hasItem(DEFAULT_HEURE_FIN.toString())))
            .andExpect(jsonPath("$.[*].dateJour").value(hasItem(DEFAULT_DATE_JOUR.toString())));
    }
    
    @Test
    @Transactional
    public void getHoraire() throws Exception {
        // Initialize the database
        horaireRepository.saveAndFlush(horaire);

        // Get the horaire
        restHoraireMockMvc.perform(get("/api/horaires/{id}", horaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(horaire.getId().intValue()))
            .andExpect(jsonPath("$.heureDepart").value(DEFAULT_HEURE_DEPART.toString()))
            .andExpect(jsonPath("$.heureFin").value(DEFAULT_HEURE_FIN.toString()))
            .andExpect(jsonPath("$.dateJour").value(DEFAULT_DATE_JOUR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHoraire() throws Exception {
        // Get the horaire
        restHoraireMockMvc.perform(get("/api/horaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHoraire() throws Exception {
        // Initialize the database
        horaireRepository.saveAndFlush(horaire);

        int databaseSizeBeforeUpdate = horaireRepository.findAll().size();

        // Update the horaire
        Horaire updatedHoraire = horaireRepository.findById(horaire.getId()).get();
        // Disconnect from session so that the updates on updatedHoraire are not directly saved in db
        em.detach(updatedHoraire);
        updatedHoraire
            .heureDepart(UPDATED_HEURE_DEPART)
            .heureFin(UPDATED_HEURE_FIN)
            .dateJour(UPDATED_DATE_JOUR);

        restHoraireMockMvc.perform(put("/api/horaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHoraire)))
            .andExpect(status().isOk());

        // Validate the Horaire in the database
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeUpdate);
        Horaire testHoraire = horaireList.get(horaireList.size() - 1);
        assertThat(testHoraire.getHeureDepart()).isEqualTo(UPDATED_HEURE_DEPART);
        assertThat(testHoraire.getHeureFin()).isEqualTo(UPDATED_HEURE_FIN);
        assertThat(testHoraire.getDateJour()).isEqualTo(UPDATED_DATE_JOUR);
    }

    @Test
    @Transactional
    public void updateNonExistingHoraire() throws Exception {
        int databaseSizeBeforeUpdate = horaireRepository.findAll().size();

        // Create the Horaire

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHoraireMockMvc.perform(put("/api/horaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horaire)))
            .andExpect(status().isBadRequest());

        // Validate the Horaire in the database
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHoraire() throws Exception {
        // Initialize the database
        horaireRepository.saveAndFlush(horaire);

        int databaseSizeBeforeDelete = horaireRepository.findAll().size();

        // Delete the horaire
        restHoraireMockMvc.perform(delete("/api/horaires/{id}", horaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Horaire.class);
        Horaire horaire1 = new Horaire();
        horaire1.setId(1L);
        Horaire horaire2 = new Horaire();
        horaire2.setId(horaire1.getId());
        assertThat(horaire1).isEqualTo(horaire2);
        horaire2.setId(2L);
        assertThat(horaire1).isNotEqualTo(horaire2);
        horaire1.setId(null);
        assertThat(horaire1).isNotEqualTo(horaire2);
    }
}
