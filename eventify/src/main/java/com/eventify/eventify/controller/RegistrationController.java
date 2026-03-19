package com.eventify.eventify.controller;

import com.eventify.eventify.dto.RegistrationDto;
import com.eventify.eventify.model.Registration;
import com.eventify.eventify.model.User;
import com.eventify.eventify.repository.UserRepository;
import com.eventify.eventify.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final UserRepository userRepository;

    public RegistrationController(RegistrationService registrationService, UserRepository userRepository) {
        this.registrationService = registrationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/events/{eventId}/register")
    public ResponseEntity<?> register(
            @PathVariable Long eventId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            String username = userDetails.getUsername();

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

            Registration registration = registrationService.register(user.getId(), eventId);

            return ResponseEntity.ok(registration);

        } catch (RuntimeException e) {

            if ("DUPLICATE_REGISTRATION".equals(e.getMessage())) {
                return ResponseEntity.badRequest().body("Vous êtes déjà inscrit à cet événement");
            }

            if ("EVENT_FULL".equals(e.getMessage())) {
                return ResponseEntity.badRequest().body("Cet événement est complet");
            }

            return ResponseEntity.status(500).body("Erreur serveur");
        }
    }

    @GetMapping("/me/registrations")
    public List<RegistrationDto> getMyRegistrations(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String username = userDetails.getUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        return registrationService.getUserRegistrations(user.getId())
                .stream()
                .map(reg -> new RegistrationDto(
                        reg.getId(),
                        reg.getEvent().getId(),
                        reg.getEvent().getTitle(),
                        reg.getRegistrationDate()
                ))
                .toList();
    }

    @DeleteMapping("/registrations/{id}")
    public void deleteRegistration(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
    }
}