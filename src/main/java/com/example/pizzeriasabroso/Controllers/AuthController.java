package com.example.pizzeriasabroso.Controllers;

import com.example.pizzeriasabroso.Entities.Administrador;
import com.example.pizzeriasabroso.Services.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private AdministradorService administradorService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Administrador credentials) {
        Administrador admin = administradorService.findByEmail(credentials.getEmail());
        if (admin != null && admin.getContraseña().equals(credentials.getContraseña())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
