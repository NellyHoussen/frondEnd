package com.nellyhoussen.backend.Controller;

import com.nellyhoussen.backend.DTO.VoitureDTO;
import com.nellyhoussen.backend.Service.FileStorageService;
import com.nellyhoussen.backend.Service.VoitureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/voitures")
@RequiredArgsConstructor
public class VoitureController {

    private final VoitureService voitureService;
    private final FileStorageService fileStorageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<VoitureDTO> creer(
            @Valid @RequestPart("voiture") VoitureDTO dto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        String imageUrl = dto.imageUrl();

        if (image != null && !image.isEmpty()) {
            imageUrl = fileStorageService.store(image);
        }

        VoitureDTO cree = voitureService.creer(dto, imageUrl);

        return ResponseEntity
                .created(URI.create("/api/v1/voitures/" + cree.id()))
                .body(cree);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VoitureDTO> obtenirParId(@PathVariable Long id) {
        return ResponseEntity.ok(voitureService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<VoitureDTO>> lister(
            @RequestParam(required = false, defaultValue = "false") boolean disponiblesUniquement
    ) {
        List<VoitureDTO> voitures = disponiblesUniquement
                ? voitureService.findByDisponbility()
                : voitureService.findAll();

        return ResponseEntity.ok(voitures);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VoitureDTO> mettreAJour(
            @PathVariable Long id,
            @Valid @RequestBody VoitureDTO dto
    ) {
        return ResponseEntity.ok(voitureService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        voitureService.supprimer(id);
        return ResponseEntity.noContent().build();
    }
}