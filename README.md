# Bloco de tarefas

## Sumário

- [Descrição](#descrição)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Scripts](#scripts)
- [Configuração](#configuração)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [API](#api)
- [Paginas](#paginas)


## Descrição

Este bloco de tarefas é uma aplicação fullstack que permite a gestão de tarefas. O frontend é construído em React, enquanto o backend é desenvolvido com Node.js e Express. A aplicação permite que usuários criem, editem e excluam tarefas, com persistência de dados em um banco de dados MySQL. Possuindo as seguintes funções: 

* Cadastro de Usuário. O usuário deve ser capaz de se cadastrar com e-mail e senha. Implementar validação básica para e-mail e senha.

* Autenticação. Implementar login e logout de usuários utilizando JWT (JSON Web Token). Apenas usuários autenticados devem ter acesso às funcionalidades de gerenciamento de tarefas.

* Gerenciamento de Tarefas. Listar todas as tarefas do usuário autenticado. Adicionar novas tarefas com um título e uma descrição. Marcar tarefas como concluídas. Editar o título e a descrição de uma tarefa. Excluir uma tarefa.




## Requisitos

- **Node.js** versão 20.x ou superior
- **NPM** versão 10.x ou superior (ou **Yarn**)
- **Banco de Dados**: MySQL

## Instalação

### Clonando o Repositório

```bash
git clone https://github.com/YuriMont/jack-experts-challenge.git

cd jack-experts-challenge
```

### Backend
1. Navegue até o diretório do backend:

```
cd server
```

2. Instale as dependências
```
npm install
```
3. Configure o banco de dados e variáveis de ambiente veja em [configuração](#configuração).

4. Atualize o banco de dados
```
npx prisma migrate deploy
``` 

5. Adicione 10 cores ao banco de dados
```
npm run seed
``` 
 
6. Inicie o servidor
```
npm run dev
```

### Frontend
1. Navegue até o diretório do frontend
```
cd web
```

2. Instale as dependências
```
npm install
```

3. Inicie o servidor
```
npm run dev
```


## Estrutura de Pastas
```plaintext
nome-do-repositorio/
│
├── server/             # Código fonte do backend
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── server.ts
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
├── web/            # Código fonte do frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
└── README.md            # Documentação do projeto

```

## Scripts

### Backend
* `npm run start`: Inicia o servidor Node.js em modo de produção.
* `npm run seed`: Cria 10 cores e as insere no banco de dados
* `npm run dev`: Inicia o servidor Node.js em modo de desenvolvimento com auto-reload.

### Frontend
* `npm run dev`: Inicia o servidor de desenvolvimento React.
* `npm run build`: Gera a build para produção.


## Configuração

### Variáveis de Ambiente
No diretório `server`, crie um arquivo `.env` com as seguintes variáveis:
```
DATABASE_URL="mysql://<usuario>:<senha>@<host>:<porta>/<nome_banco_de_dados>"
SECRET="<secret>"
```
No diretório `web`, crie um arquivo `.env.local` com a seguinte variável:
```
VITE_API_BACKEND_URL="<url_do_server>"
```

## Tecnologias Utilizadas
### Backend
* Node.Js
* TypeScript
* Express
* Prisma ORM
* Zod
* JWT
* Bcrypt

### Frontend
* React
* TypeScript
* Tailwind CSS
* Axios
* Zod
* React hook forms
* React router dom
* Universal cookies
* TanStack Query

## API
### Rotas Públicas
1. `POST /signin` - Realiza o login do usuário e retorna um token JWT.

* Parâmetros de Entrada:
    * email (string, obrigatório)
    * password (string, obrigatório)

* Exemplo de Requisição:
```
{
  "email": "usuario@gmail.com",
  "password": "senha123"
}
```
* Exemplo de Resposta
```
naiosdejfhoiaserthq90wenf9ashdg98bnsdaiofgj09acvbmiopsj0e9rtjgsdiongb89sdhdrg98nsdfuihg
```

2. `POST /register` - Realiza o registro do usuario no banco de dados
* Parâmetros de Entrada:
    * name (string, obrigatório)
    * email (string, obrigatório)
    * password (string, obrigatório)
    * confirm_password (string, obrigatório)

* Exemplo de Requisição:
```
{
  "name": "John Doe"  1
  "email": "usuario@gmail.com",
  "password": "senha123",
  "confirm_password": "senha123"
}
```
* Exemplo de Resposta
```
{
    "id": "98hjd_oisjgbn_8jhv9r;
    "name": "John Doe";
    "email": "usuario@gmail.com";
}
```

3. `GET /colors` - Retorna todas as cores disponíveis no banco de dados

    * Exemplo de Resposta:
```
[
  {
    "id": "1",
    "name": "red",
    "code": "#FF0000"
  },
  {
    "id": "2",
    "name": "green",
    "code": "#00FF00"
  },
  {
    "id": "3",
    "name": "blue",
    "code": "#0000FF"
  }
]
```

4. `POST /colors` - Cria uma nova cor no banco de dados.

* Parâmetros de Entrada:
    * name (string, obrigatório).
    * code (string, obrigatório).

* Exemplo de Requisição:
```
{
  "name": "yellow",
  "code": "#FFFF00"
}
```

* Exemplo de Resposta:
```
{
  "id": "4",
  "name": "yellow",
  "code": "#FFFF00"
}
```

### Rotas privadas

Todas as rotas devem ser passadas um Bearer Token

1. `GET /tasks` - Retorna todas as tarefas disponíveis do usuario logado

    * Exemplo de Resposta:
```
[
  {
    "id": 1,
    "title": "Task 1",
    "content": "This is the content of task 1.",
    "completed": true,
    "color": {
      "id": 101,
      "name": "Red",
      "code": "#FF0000"
    }
  },
  {
    "id": 2,
    "title": "Task 2",
    "content": "This is the content of task 2.",
    "completed": true,
    "color": {
      "id": 102,
      "name": "Blue",
      "code": "#0000FF"
    }
  },
  {
    "id": 3,
    "title": "Task 3",
    "content": "This is the content of task 3.",
    "completed": false,
    "color": {
      "id": 103,
      "name": "Green",
      "code": "#00FF00"
    }
  }
]

```

2. `POST /tasks` - Cria uma nova tarefa atrelada ao usuario logado.

* Parâmetros de Entrada:
    * title (string, obrigatório).
    * content (string, obrigatório).
    * color_id (number, opcional).

* Exemplo de Requisição:
```
{
  "title": "Task 3",
  "content": "This is the content of task 3.",
  "color_id": "1"
}
```

* Exemplo de Resposta:
```
{
    "id": 3,
    "title": "Task 3",
    "content": "This is the content of task 3.",
    "completed": false,
    "color": {
      "id": 1,
      "name": "Green",
      "code": "#00FF00"
    }
}
```

3. `PUT /tasks/<id>` - Atualiza a tarefa cujo o id é passado e que está atrelada ao usuario logado.

* Parâmetros de Entrada:
    * title (string, obrigatório).
    * content (string, obrigatório).
    * color_id (number, opcional).

* Exemplo de Requisição:
```
{
  "title": "tarefa 1",
  "content": "Limpar a casa"
  "color_id": "1"
}
```

* Exemplo de Resposta:
```
{
    "id": 3,
    "title": "Task 3",
    "content": "This is the content of task 3.",
    "completed": false,
    "color": {
      "id": 1,
      "name": "Green",
      "code": "#00FF00"
    }
}
```


4. `GET /tasks/<id>` - Retorna a tarefa cujo o id é passado e que pertença ao usuario logado

    * Exemplo de Resposta:
```
{
    "id": 3,
    "title": "Task 3",
    "content": "This is the content of task 3.",
    "completed": false,
    "color": {
      "id": 103,
      "name": "Green",
      "code": "#00FF00"
    }
}
```

5. `DELETE /tasks/<id>` - Deleta a tarefa cujo o id é passado caso pertença ao usuario logado

    * Exemplo de Resposta:
```
{
    "message": "Task deleted successfully!"
}
```

6. `GET /tasks/completed` - Retorna as tarefas concluidas que pertença ao usuario logado

    * Exemplo de Resposta:
```
[
  {
    "id": 1,
    "title": "Task 1",
    "content": "This is the content of task 1.",
    "completed": true,
    "color": {
      "id": 101,
      "name": "Red",
      "code": "#FF0000"
    }
  },
  {
    "id": 2,
    "title": "Task 2",
    "content": "This is the content of task 2.",
    "completed": true,
    "color": {
      "id": 102,
      "name": "Blue",
      "code": "#0000FF"
    }
  },
  {
    "id": 3,
    "title": "Task 3",
    "content": "This is the content of task 3.",
    "completed": true,
    "color": {
      "id": 103,
      "name": "Green",
      "code": "#00FF00"
    }
  }
]

```

7. `PUT /tasks/completed/<id>` - Atualiza o status de completado da tarefa cujo o id é passado e que pertença ao usuario

    * Exemplo de Resposta:
```
{
    "message": "Task updated successfully!"
}
```


## Paginas
* `/sign-in/` - Login 
![tela de login](/images/img1.png)
* `/sign-out/` - Cadastro
![tela de registro](/images/img2.png)
* `/` - Home
![tela de atividades vazia](/images/img3.png)
![tela de criação de atividade](/images/img4.png)
![tela de seleção cores](/images/img5.png)
![tela de atividades](/images/img6.png)
![tela de escolha de cores](/images/img7.png)
![tela de comcluido](/images/img8.png)
![tela mobile](/images/img9.png)

