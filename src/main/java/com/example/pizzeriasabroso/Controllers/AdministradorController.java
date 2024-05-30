package com.example.pizzeriasabroso.Controllers;

import com.example.pizzeriasabroso.Entities.Administrador;
import com.example.pizzeriasabroso.Services.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @GetMapping
    public List<Administrador> getAllAdministradores() {
        return administradorService.getAllAdministradores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrador> getAdministradorById(@PathVariable Integer id) {
        Administrador administrador = administradorService.getAdministradorById(id);
        return administrador != null ? ResponseEntity.ok(administrador) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Administrador createAdministrador(@RequestBody Administrador administrador) {
        return administradorService.saveAdministrador(administrador);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrador> updateAdministrador(@PathVariable Integer id, @RequestBody Administrador administradorDetails) {
        Administrador administrador = administradorService.getAdministradorById(id);
        if (administrador != null) {
            administrador.setNombre(administradorDetails.getNombre());
            administrador.setEmail(administradorDetails.getEmail());
            administrador.setContraseña(administradorDetails.getContraseña());
            return ResponseEntity.ok(administradorService.saveAdministrador(administrador));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdministrador(@PathVariable Integer id) {
        administradorService.deleteAdministrador(id);
        return ResponseEntity.noContent().build();
    }
}
