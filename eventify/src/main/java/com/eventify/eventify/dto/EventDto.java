package com.eventify.eventify.dto;

import java.time.LocalDateTime;

public class EventDto {

    private Long id;
    private String title;
    private String description;
    private LocalDateTime eventDate;
    private String imagePath;

    // BONUS
    private int participantCount;

    public EventDto(Long id, String title, String description, LocalDateTime eventDate, String imagePath, int participantCount) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.imagePath = imagePath;
        this.participantCount = participantCount;
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

    public int getParticipantCount() {
        return participantCount;
    }
}