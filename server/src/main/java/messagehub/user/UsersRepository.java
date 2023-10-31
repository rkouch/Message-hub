package messagehub.user;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional
public interface UsersRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String Email);
}
