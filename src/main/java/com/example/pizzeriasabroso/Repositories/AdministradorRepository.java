package com.example.pizzeriasabroso.Repositories;

import com.example.pizzeriasabroso.Entities.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministradorRepository extends JpaRepository<Administrador, Integer> {
    Administrador findByEmail(String email);
}
