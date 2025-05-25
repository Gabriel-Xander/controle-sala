# Sistema de Controle de Sala

Sistema de gerenciamento de salas desenvolvido com arquitetura de microsserviços utilizando Spring Boot.

## 🏗️ Arquitetura

O sistema é composto por três microsserviços principais:

- **ms-sala**: Gerenciamento de salas
- **ms-usuario**: Gerenciamento de usuários
- **ms-reserva**: Gerenciamento de reservas
- **frontend**: Interface do usuário desenvolvida em React
- **nginx**: Gateway de API para roteamento
- **rabbitmq**: Sistema de mensageria para comunicação entre microsserviços

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 21** ☕
- **Spring Boot 3.4.4** 🍃
- **Spring Data JPA**
- **Spring Web**
- **Spring AMQP** (RabbitMQ)
- **MySQL 8.0** 🗄️
- **Maven** 📦
- **Docker & Docker Compose** 🐳

### Frontend
- **React.js 19.1.0** ⚛️
- **Material-UI** 🎨
- **Tailwind CSS** 💅
- **Axios** 📡

### Infraestrutura
- **Nginx** (API Gateway) 🌐
- **RabbitMQ** (Mensageria) 🐰
- **Adminer** (Gerenciamento de BD) 🛠️

## ⚡ Funcionalidades

### Comunicação entre Microsserviços
- **Mensageria assíncrona** via RabbitMQ
- **API Gateway** centralizado com Nginx
- **Bancos de dados separados** para cada microsserviço

### Principais Endpoints
- `GET /api/usuarios` - Listar usuários
- `GET /api/salas` - Listar salas
- `GET /api/reservas` - Listar reservas

## 📋 Pré-requisitos

- **Docker** 🐳
- **Docker Compose** 🔧
- **Java 21** (para desenvolvimento)
- **Maven** (para desenvolvimento)

## 🔧 Executando o Projeto

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

- **Frontend**: http://localhost:3000 🌐
- **API Gateway (Nginx)**: http://localhost:80 🚪
- **ms-usuario**: http://localhost:8080 👤
- **ms-sala**: http://localhost:8081 🏢
- **ms-reserva**: http://localhost:8082 📅
- **RabbitMQ Management**: http://localhost:15672 🐰
  - Usuário: `admin` / Senha: `admin`
- **Adminer (Gerenciamento de BD)**: http://localhost:4040 🗄️

### Bancos de Dados
- **ms-usuario**: MySQL na porta 3307
- **ms-sala**: MySQL na porta 3308
- **ms-reserva**: MySQL na porta 3309

## 🛠️ Desenvolvimento

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

## 📁 Estrutura do Projeto

```
.
├── ms-usuario/          # Microsserviço de usuários
├── ms-sala/            # Microsserviço de salas
├── ms-reserva/         # Microsserviço de reservas
├── frontend/           # Interface do usuário
├── nginx/              # Configuração do API Gateway
└── docker-compose.yml  # Configuração dos containers
```

## 🔄 Fluxo de Comunicação

1. **Frontend** → **Nginx** (API Gateway)
2. **Nginx** → **Microsserviços** (Roteamento)
3. **ms-usuario** ↔ **ms-reserva** (Mensageria RabbitMQ)

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. 
