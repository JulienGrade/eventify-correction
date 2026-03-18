package com.eventify.eventify.seed;

import com.eventify.eventify.model.User;
import com.eventify.eventify.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DevUserSeeder {

    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                userRepository.save(new User(
                        "admin",
                        encoder.encode("admin123"),
                        "ROLE_ADMIN"
                ));
                System.out.println("Admin créé : admin / admin123");
            }
            if (userRepository.findByUsername("user").isEmpty()) {
                userRepository.save(new User(
                        "user",
                        encoder.encode("user123"),
                        "ROLE_USER"
                ));
            }
        };
    }
}
