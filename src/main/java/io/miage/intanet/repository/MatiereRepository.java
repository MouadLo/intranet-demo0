package io.miage.intanet.repository;

import io.miage.intanet.domain.Matiere;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Matiere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Long> {

    @Query("select matiere from Matiere matiere where matiere.user.login = ?#{principal.username}")
    List<Matiere> findByUserIsCurrentUser();

}
