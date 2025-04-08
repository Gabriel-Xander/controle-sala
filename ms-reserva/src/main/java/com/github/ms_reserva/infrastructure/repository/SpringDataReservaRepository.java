package com.github.ms_reserva.infrastructure.repository;

import com.github.ms_reserva.domain.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataReservaRepository extends JpaRepository<Reserva, Long> {
}