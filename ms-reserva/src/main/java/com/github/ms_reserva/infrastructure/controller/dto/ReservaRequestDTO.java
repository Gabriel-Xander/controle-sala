package com.github.ms_reserva.infrastructure.controller.dto;

public record ReservaRequestDTO(String dataHora,
                                Long salaId,
                                Long usuarioId) {
}
