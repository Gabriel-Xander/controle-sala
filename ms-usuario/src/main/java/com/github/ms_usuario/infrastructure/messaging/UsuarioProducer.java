package com.github.ms_usuario.infrastructure.messaging;

import com.github.ms_usuario.infrastructure.messaging.dto.UsuarioMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UsuarioProducer {
    private final RabbitTemplate rabbitTemplate;
    private final String responseQueue;

    public UsuarioProducer(RabbitTemplate rabbitTemplate,
                           @Value("${rabbitmq.queue.usuario.response}") String responseQueue) {
        this.rabbitTemplate = rabbitTemplate;
        this.responseQueue = responseQueue;
    }

    public void enviarResposta(UsuarioMessage message) {
        rabbitTemplate.convertAndSend(responseQueue, message);
    }
}
