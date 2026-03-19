package com.eventify.eventify.dto;

import java.time.LocalDateTime;

public class RegistrationDto {

    private Long id;
    private Long eventId;
    private String eventTitle;
    private LocalDateTime registrationDate;

    public RegistrationDto(Long id, Long eventId, String eventTitle, LocalDateTime registrationDate) {
        this.id = id;
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.registrationDate = registrationDate;
    }

    public Long getId() {
        return id;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }
}