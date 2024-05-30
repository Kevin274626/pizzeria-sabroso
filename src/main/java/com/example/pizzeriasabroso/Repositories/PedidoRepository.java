package com.example.pizzeriasabroso.Repositories;

import com.example.pizzeriasabroso.Entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
}
