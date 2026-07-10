package com.nellyhoussen.backend.Controller;

import com.nellyhoussen.backend.DTO.ClientDTO;
import com.nellyhoussen.backend.Service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientDTO> creer(@Valid @RequestBody ClientDTO dto) {
        ClientDTO cree = clientService.creer(dto);
        return ResponseEntity.created(URI.create("/api/v1/clients/" + cree.id())).body(cree);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> obtenirParId(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.FindById(id));
    }

    @GetMapping
    public ResponseEntity<List<ClientDTO>> lister() {
        return ResponseEntity.ok(clientService.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> mettreAJour(@PathVariable Long id, @Valid @RequestBody ClientDTO dto) {
        return ResponseEntity.ok(clientService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        clientService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}