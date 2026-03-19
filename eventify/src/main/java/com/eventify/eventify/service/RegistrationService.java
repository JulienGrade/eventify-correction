package com.eventify.eventify.service;

import com.eventify.eventify.model.Event;
import com.eventify.eventify.model.Registration;
import com.eventify.eventify.model.User;
import com.eventify.eventify.repository.EventRepository;
import com.eventify.eventify.repository.RegistrationRepository;
import com.eventify.eventify.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public RegistrationService(
            RegistrationRepository registrationRepository,
            UserRepository userRepository,
            EventRepository eventRepository
    ) {
        this.registrationRepository = registrationRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public Registration register(Long userId, Long eventId) {

        // doublon
        if (registrationRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new RuntimeException("Vous êtes déjà inscrit à cet événement");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Événement introuvable"));

        // 🔥 BONUS : limite participants
        long participants = registrationRepository.countByEventId(eventId);

        if (event.getMaxParticipants() != null &&
                participants >= event.getMaxParticipants()) {
            throw new RuntimeException("Cet événement est complet");
        }

        Registration registration = new Registration();
        registration.setUser(user);
        registration.setEvent(event);
        registration.setRegistrationDate(LocalDateTime.now());

        return registrationRepository.save(registration);
    }

    public List<Registration> getUserRegistrations(Long userId) {
        return registrationRepository.findByUserId(userId);
    }

    public void deleteRegistration(Long registrationId) {
        registrationRepository.deleteById(registrationId);
    }
}