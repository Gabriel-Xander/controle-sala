package com.github.ms_usuario.infrastructure.messaging.dto;

import java.io.Serializable;

public record UsuarioMessage(
        Long usuarioId,
        boolean valido
) implements Serializable {
    private static final long serialVersionUID = 1L;
}
