package com.github.ms_reserva.infrastructure.messaging;

import com.github.ms_reserva.infrastructure.messaging.dto.UsuarioMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UsuarioProducer {
    private final RabbitTemplate rabbitTemplate;
    private final String requestQueue;

    public UsuarioProducer(RabbitTemplate rabbitTemplate,
                           @Value("${rabbitmq.queue.usuario.request}") String requestQueue) {
        this.rabbitTemplate = rabbitTemplate;
        this.requestQueue = requestQueue;
    }

    public void enviarRequisicao(UsuarioMessage message) {
        rabbitTemplate.convertAndSend(requestQueue, message);
    }
}
