package com.eventify.eventify.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDateTime eventDate;

    private String imagePath;

    // 🔥 BONUS
    private Integer maxParticipants;

    // Constructeur vide obligatoire pour Hibernate
    public Event() {
    }

    public Event(String title, String description, LocalDateTime eventDate, String imagePath) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.imagePath = imagePath;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public String getImagePath() {
        return imagePath;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }
}