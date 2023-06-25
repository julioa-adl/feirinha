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

# Requisitos do Projeto

<details><summary>BackEnd</summary>

## Rota USER

> 01 - POST /user - Criar novos Usuários:
```
  name: string,
  email: string,
  password: string,
  birthday: string,
  role: string
```

  - O SUPER é auto-criado ao inserir o primeiro USER.

> 02 - POST /login - Fazer login:
  email: string,
  password: string.

  - Gera Token e salva nos Headers da requisiçao.

> 03 - PUT /user - Atualiza informações dos usuários:
  - O usuário SUPER só pode ser editado por ele mesmo | Impossível mudar a ROLE do SUPER.
  - Os USERs não podem mudar suas próprias ROLEs, apenas informações pessoais.
  - Só o SUPER pode dar ADMINs.

> 04 - DELETE /user - Deletar Usuários:
  - O SUPER pode deletar todos menos a si mesmo.
  - Os ADMINs podem deletar os USERs e outros ADMINs.
  - Os USERs podem apenas se DELETAR, mas não a outros USERS.

## Rota USER

> 01 - POST /product - Cadastrar um novo produto:

```
  name: string,
  subName: string,
  manufacturer: string,
  category: string,
  code: string,
  unitMeasure: string,
  size: number,
  image: string,
```
  - O name deve vir com a descrição genérica ex: 'Macarrão'.
  - O subName deve ser uma descrição mais detalhada ex: 'Espaguete'.
  - A imagem deve vir a rota de onde ela foi salva.
  - Qualquer pessoa pode cadastrar um novo produto.
  - o Código de barras será lido pelo front e automáticamente mandado para o backend.

  </details>