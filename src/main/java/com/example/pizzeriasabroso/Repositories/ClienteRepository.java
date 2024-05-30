package com.example.pizzeriasabroso.Repositories;

import com.example.pizzeriasabroso.Entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
