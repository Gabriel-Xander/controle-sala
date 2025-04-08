package com.github.ms_sala.infrastructure.repository;

import com.github.ms_sala.domain.model.Sala;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataSalaRepository extends JpaRepository<Sala, Long> {
}