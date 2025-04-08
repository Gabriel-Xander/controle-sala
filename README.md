# Controle de Sala

Sistema de controle de sala desenvolvido com Python e FastAPI.

## Requisitos

- Docker
- Docker Compose

## Instalação e Execução

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd controle_sala
```

2. Execute o projeto usando Docker Compose:
```bash
docker-compose up --build
```

O sistema estará disponível em `http://localhost:8000`

## Estrutura do Projeto

- `app/`: Diretório principal da aplicação
  - `main.py`: Arquivo principal da aplicação FastAPI
  - `models/`: Modelos do banco de dados
  - `schemas/`: Schemas Pydantic
  - `crud/`: Operações CRUD
  - `database.py`: Configuração do banco de dados

## Documentação da API

Após iniciar o servidor, a documentação da API estará disponível em:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Desenvolvimento

Para desenvolvimento local, você pode criar um ambiente virtual Python:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

## Licença

Este projeto está sob a licença MIT. 
