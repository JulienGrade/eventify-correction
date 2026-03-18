package com.eventify.eventify.seed;

import com.eventify.eventify.model.Event;
import com.eventify.eventify.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;

@Configuration
@Profile("dev")
public class DevEventSeeder {

    @Bean
    CommandLineRunner seedEvents(EventRepository eventRepository) {
        return args -> {

            if (eventRepository.count() == 0) {

                Event e1 = new Event(
                        "Spring Boot Workshop",
                        "Atelier d'introduction à Spring Boot",
                        LocalDateTime.now().plusDays(2),
                        null
                );

                Event e2 = new Event(
                        "Hackathon Eventify",
                        "Création d'une API sécurisée avec JWT",
                        LocalDateTime.now().plusDays(7),
                        null
                );

                Event e3 = new Event(
                        "Demo Day",
                        "Présentation finale des projets",
                        LocalDateTime.now().plusDays(14),
                        null
                );

                eventRepository.save(e1);
                eventRepository.save(e2);
                eventRepository.save(e3);

                System.out.println("[DEV SEED] Events de démo créés.");
            }
        };
    }
}
