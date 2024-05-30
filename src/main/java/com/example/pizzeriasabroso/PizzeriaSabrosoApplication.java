package com.example.pizzeriasabroso;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.pizzeriasabroso.Entities.Administrador;
import com.example.pizzeriasabroso.Services.AdministradorService;

@SpringBootApplication
public class PizzeriaSabrosoApplication {

    public static void main(String[] args) {
        SpringApplication.run(PizzeriaSabrosoApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(AdministradorService administradorService) {
        return (args) -> {
            // Aquí puedes crear un administrador por defecto al iniciar la aplicación
            Administrador administrador = new Administrador();
            administrador.setNombre("admin");
            administrador.setEmail("admin@example.com");
            administrador.setContraseña("admin123");
            administradorService.saveAdministrador(administrador);
        };
    }

}
