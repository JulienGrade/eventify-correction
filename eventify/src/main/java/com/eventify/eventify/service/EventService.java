package com.eventify.eventify.service;

import com.eventify.eventify.dto.EventDto;
import com.eventify.eventify.exception.ResourceNotFoundException;
import com.eventify.eventify.model.Event;
import com.eventify.eventify.repository.EventRepository;
import com.eventify.eventify.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;

    public EventService(EventRepository eventRepository, RegistrationRepository registrationRepository) {
        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
    }

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(event -> new EventDto(
                        event.getId(),
                        event.getTitle(),
                        event.getDescription(),
                        event.getEventDate(),
                        event.getImagePath(),
                        (int) registrationRepository.countByEventId(event.getId())
                ))
                .toList();
    }


    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}



