package com.eventify.eventify.repository;

import com.eventify.eventify.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    List<Registration> findByUserId(Long userId);

    // BONUS
    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    // BONUS
    long countByEventId(Long eventId);
}