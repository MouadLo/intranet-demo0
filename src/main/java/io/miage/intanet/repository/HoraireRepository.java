package io.miage.intanet.repository;

import io.miage.intanet.domain.Horaire;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Horaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoraireRepository extends JpaRepository<Horaire, Long> {

}
