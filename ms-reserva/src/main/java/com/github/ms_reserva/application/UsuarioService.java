package com.github.ms_reserva.application;

import com.github.ms_reserva.infrastructure.messaging.UsuarioProducer;
import com.github.ms_reserva.infrastructure.messaging.dto.UsuarioMessage;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UsuarioService {
    private final UsuarioProducer usuarioProducer;
    private final ConcurrentHashMap<Long, CompletableFuture<Boolean>> pendingValidations = new ConcurrentHashMap<>();

    public UsuarioService(UsuarioProducer usuarioProducer) {
        this.usuarioProducer = usuarioProducer;
    }

    public CompletableFuture<Boolean> validarUsuario(Long usuarioId) {
        CompletableFuture<Boolean> future = new CompletableFuture<>();
        pendingValidations.put(usuarioId, future);

        usuarioProducer.enviarRequisicao(new UsuarioMessage(usuarioId, false));
        return future;
    }

    public void receberResultadoValidacao(UsuarioMessage message) {
        CompletableFuture<Boolean> future = pendingValidations.remove(message.usuarioId());
        if (future != null) {
            future.complete(message.valido());
        }
    }
}
