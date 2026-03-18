package com.eventify.eventify.controller;

import com.eventify.eventify.dto.EventDto;
import com.eventify.eventify.model.Event;
import com.eventify.eventify.service.EventService;
import com.eventify.eventify.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final FileStorageService fileStorageService;

    public EventController(EventService eventService, FileStorageService fileStorageService) {
        this.eventService = eventService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public List<EventDto> getEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);
        return eventService.saveEvent(event);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event) {
        Event existingEvent = eventService.getEventById(id);

        existingEvent.setTitle(event.getTitle());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setEventDate(event.getEventDate());

        return eventService.saveEvent(existingEvent);
    }

    @PostMapping(value = "/{id}/image", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        Event event = eventService.getEventById(id);

        String filename = fileStorageService.saveFile(file);

        event.setImagePath(filename);
        eventService.saveEvent(event);

        return ResponseEntity.ok(
                Map.of("message", "Image uploadée")
        );
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}