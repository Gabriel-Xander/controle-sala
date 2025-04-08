package com.github.ms_reserva.infrastructure.controller.dto;

public record ReservaResponseDTO(Long id,
                                 String dataHora,
                                 Long salaId,
                                 Long usuarioId) {
}
