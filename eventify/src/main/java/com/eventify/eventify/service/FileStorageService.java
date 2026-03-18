package com.eventify.eventify.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String uploadDir = "uploads";

    public String saveFile(MultipartFile file) {

        // Vérification fichier vide
        if (file.isEmpty()) {
            throw new RuntimeException("Fichier vide");
        }

        // Vérification taille (max 2MB)
        if (file.getSize() > 2_000_000) {
            throw new RuntimeException("Fichier trop volumineux (max 2MB)");
        }

        // Vérification type MIME
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new RuntimeException("Seules les images sont autorisées");
        }

        try {

            // Sécurisation nom original
            String originalFilename = file.getOriginalFilename();

            String safeFilename = (originalFilename == null)
                    ? "file"
                    : originalFilename.replaceAll("[^a-zA-Z0-9._-]", "_");

            // Génération nom unique
            String filename = UUID.randomUUID() + "_" + safeFilename;

            Path uploadPath = Paths.get(uploadDir);

            // Création dossier si absent
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);

            // Écriture fichier
            Files.write(filePath, file.getBytes());

            return filename;

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du stockage du fichier");
        }
    }
}
