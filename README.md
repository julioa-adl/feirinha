# PROJECT FEIRINHA

# Contexto
Este projeto trata-se de uma Aplicação FullStack para Listar, Organizar, Precificar e Acompanhar suas Listas de Feiras em Super-mercados.

Nele é possível:
- Registrar-se como novo usuário e Logar em sua Conta.
- Criar uma pré-lista de feirinha para lembrete.
- Cadastrar Produtos Durante a compra (registrando o código de barras).
- Cadastrar Mercados.
- Ter registro histórico de preços por produto e por mercado.
- Estatísticas históricas feirinhas.
- Sugestão de Economia com base em histórico passado.

## Técnologias usadas

Front-end:
> Desenvolvido usando: Next.js, React, Context, CSS3, HTML5, TailWind, TypeScript, Axios.

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MongoDB, Mongoose, ES6, TypeScript, JWT, Bcrypt, Docker.


## Instalando Dependências

> Backend
```bash
cd backend/ 
npm install
``` 
> Frontend
```bash
cd frontend/
npm install
``` 
## Executando aplicação

* Para rodar o back-end:

  ```
  cd backend/ && docker-compose up -d --build
  && docker exec -it feirinha_api bash
  ```
* Para rodar o front-end:

  ```
    cd frontend/ && npm start
  ```

## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
  ```