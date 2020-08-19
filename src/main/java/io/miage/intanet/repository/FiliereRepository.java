package io.miage.intanet.repository;

import io.miage.intanet.domain.Filiere;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Filiere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {

}
