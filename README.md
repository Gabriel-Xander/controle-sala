# Sistema de Controle de Sala

Sistema de gerenciamento de salas desenvolvido com arquitetura de microsserviços utilizando Spring Boot.

## Arquitetura

O sistema é composto por três microsserviços principais:

- **ms-sala**: Gerenciamento de salas
- **ms-usuario**: Gerenciamento de usuários
- **ms-reserva**: Gerenciamento de reservas
- **frontend**: Interface do usuário desenvolvida em React

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Web
- PostgreSQL
- Maven
- Docker
- Docker Compose

### Frontend
- React.js
- Tailwind CSS
- Nginx

## Pré-requisitos

- Docker
- Docker Compose
- Java 17 (para desenvolvimento)
- Maven (para desenvolvimento)
- Node.js (para desenvolvimento do frontend)

## Executando o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/Gabriel-Xander/controle-sala.git
cd controle-sala
```

2. Execute o sistema completo usando Docker Compose:
```bash
docker-compose up --build
```

Após a execução, os serviços estarão disponíveis em:

- Frontend: http://localhost:3000
- ms-usuario: http://localhost:8080
- ms-sala: http://localhost:8081
- ms-reserva: http://localhost:8082
- Adminer (Gerenciamento de Banco de Dados): http://localhost:4040

## Documentação das APIs

Após iniciar os serviços, a documentação Swagger estará disponível em:

- ms-usuario: http://localhost:8080/swagger-ui.html
- ms-sala: http://localhost:8081/swagger-ui.html
- ms-reserva: http://localhost:8082/swagger-ui.html

## Desenvolvimento

Para desenvolvimento local de cada microsserviço:

1. Entre no diretório do microsserviço desejado:
```bash
cd ms-usuario # ou ms-sala ou ms-reserva
```

2. Execute o Maven:
```bash
./mvnw spring-boot:run
```

Para o frontend:
```bash
cd frontend
npm install
npm start
```

## Estrutura do Projeto

```
.
├── ms-usuario/          # Microsserviço de usuários
├── ms-sala/            # Microsserviço de salas
├── ms-reserva/         # Microsserviço de reservas
├── frontend/           # Interface do usuário
└── docker-compose.yml  # Configuração dos containers
```

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. 
