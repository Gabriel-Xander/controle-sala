package com.github.ms_usuario.infrastructure.messaging;

import com.github.ms_usuario.application.UsuarioService;
import com.github.ms_usuario.infrastructure.messaging.dto.UsuarioMessage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class UsuarioConsumer {
    private final UsuarioService usuarioService;
    private final UsuarioProducer usuarioProducer;

    public UsuarioConsumer(UsuarioService usuarioService, UsuarioProducer usuarioProducer) {
        this.usuarioService = usuarioService;
        this.usuarioProducer = usuarioProducer;
    }

    @RabbitListener(queues = "${rabbitmq.queue.usuario.request}")
    public void consumer(UsuarioMessage message) {
        boolean usuarioExiste = usuarioService.buscarPorId(message.usuarioId());
        UsuarioMessage response = new UsuarioMessage(message.usuarioId(), usuarioExiste);
        usuarioProducer.enviarResposta(response);
    }
}
