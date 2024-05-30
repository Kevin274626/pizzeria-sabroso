package com.example.pizzeriasabroso.Services;

import com.example.pizzeriasabroso.Entities.Administrador;
import com.example.pizzeriasabroso.Repositories.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministradorService {
    @Autowired
    private AdministradorRepository administradorRepository;

    public List<Administrador> getAllAdministradores() {
        return administradorRepository.findAll();
    }

    public Administrador getAdministradorById(Integer id) {
        return administradorRepository.findById(id).orElse(null);
    }

    public Administrador saveAdministrador(Administrador administrador) {
        return administradorRepository.save(administrador);
    }

    public void deleteAdministrador(Integer id) {
        administradorRepository.deleteById(id);
    }

    public Administrador findByEmail(String email){
        return administradorRepository.findByEmail(email);
    }
}
