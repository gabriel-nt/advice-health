<h4 align="center">
  <img src="https://github.com/gabriel-nt/health-app/blob/master/src/assets/logo.png" alt="logo" height="110"/>
</h4>

<h1 align="center">
    🚀 Health App
</h1>

<p align="center">Backoffice da HealthApp</p>

<p align="center">
  <img src="https://img.shields.io/badge/react%20version-18.2.0-informational"/>
  <img src="https://img.shields.io/badge/last%20commit-january-blue" />
  <img src="https://img.shields.io/badge/license-MIT-success"/>
</p>

<p align="center">
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-pré-requisitos">Pré-Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Lincença</a>
</p>

<h3 align="center">
🚧  Finalizado  🚧
</h3>

### 📎 Funcionalidades

- [x] Página Inicial
  - [x] Gráfico de consultas (offline)
  - [x] Lista de lembretes do dia filtrado
  - [x] Lista de médicos com consultas no dia filtrado
- [x] Página de agendamento
  - [x] Lista da agenda dos médicos, filtrado por data
  - [x] Transferir agendamento da uma data para outra
  - [x] Excluir agendamento
  - [x] Criar agendamento
- [x] Listagem das consultas
  - [x] Campo de busca para filtrar os agendamentos
  - [x] Acessar a página de detalhes de um agendamento
- [x] Página de detalhes
  - [x] Atualizar agendamento
  - [x] Excluir agendamento
- [x] Documentação com storybook dos components

### 💻 Demonstração

<img src="https://github.com/gabriel-nt/health-app/blob/master/public/github/thumbnail.png" alt="Thumbail"/>

### ⚙ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e/ou [Yarn](https://yarnpkg.com/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 📗 Rodando a Aplicação

```bash
# Clone este repositório
$ git clone https://github.com/gabriel-nt/health-app

# Instale as dependências
$ yarn or npm i

# Execute a aplicação
$ yarn dev or npm run dev

# Executar a aplicação de produção
$ yarn preview or npm run preview
```

### 🛢 GraphQL Schemas

Para permitir as interações com a aplicação, foi utilizado a API do [Hygraph](https://hygraph.com/), onde, apartir de um plano gratuito, podemos criar nossos "schemas" e realizar diversas chamados de pesquisa (queries) e de alteração (mutations). Sendo assim, para aplicação, foram utilizadas os seguintes schemas:

- [x] Appointment
  - Possui os campos de valor de cobrança, método de pagamento, hora de ínicio e fim da consulta, dia da consulta, breve descrição, dados do paciente e médico responsável pela consulta
- [x] Doctor
  - Possui os campos de nome, biografia, avatar e appointments (consultas) relacionadas com o mesmo
- [x] Sticky Notes
  - Possui os campos de descrição, e o relacionamento entre o médido e a consulta

### 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Vite
- React
- GraphQL
- Typescript

### 📕 Bibliotecas

Esse projeto foi utilizou das seguintes lib:

- bootstrap
- @nivo/line
- @apollo/client
- dayjs
- react-bootstrap
- react-hook-form
- sass
- yup
- phosphor-react
- clsx
- @graphql-codegen

### 📘 Padrão de Código

Para padronizar a escrita do código, utilizamos as seguinte ferramentas:

- Eslint
- Prettier
- Editorconfig

### 📝 Licença

Esse projeto está sob a licença MIT.

<hr/>

Feito por Gabriel Teixeira
