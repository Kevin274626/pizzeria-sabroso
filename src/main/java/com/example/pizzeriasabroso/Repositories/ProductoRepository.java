package com.example.pizzeriasabroso.Repositories;

import com.example.pizzeriasabroso.Entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
