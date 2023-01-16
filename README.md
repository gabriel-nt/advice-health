<h4 align="center">
  <img src="https://github.com/gabriel-nt/advice-health/blob/master/src/assets/logo.png" alt="logo" height="110"/>
</h4>

<h1 align="center">
    🚀 Advice Health
</h1>

<p align="center">Backoffice da Advice Health</p>

<p align="center">
  <img src="https://img.shields.io/badge/react%20version-18.2.0-informational"/>
  <img src="https://img.shields.io/badge/last%20commit-january-blue" />
  <img src="https://img.shields.io/badge/license-MIT-success"/>
</p>

<p align="center">
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-pré-requisitos">Pré-Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Lincença</a>
</p>

<h3 align="center">
🚧  Em Desenvolvimento  🚧
</h3>

### 📎 Features

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
  - [x] Atualizar e excluir agendamento

### 🛢 Next Features

- [ ] Busca geral
- [ ] Página de login e logout
- [ ] Página de gerenciamento de consultórios
- [ ] Página de gerenciamento de médicos
- [ ] Adicionar funcionalide de realtime nos gráficos

### ✅ Demonstração

<img src="https://github.com/gabriel-nt/advice-health/blob/master/public/github/thumbnail.png" alt="Thumbail"/>

### ⚙ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e/ou [Yarn](https://yarnpkg.com/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 📗 Rodando a Aplicação

```bash
# Clone este repositório
$ git clone https://github.com/gabriel-nt/advice-health

# Instale as dependências
$ yarn or npm i

# Execute a aplicação
$ yarn dev or npm run dev

# Executar a aplicação de produção
$ yarn start or npm run start
```

### 📘 Testes

Como a aplicação está consumindo um GraphQL API, vale ressaltar os seguintes detalhes:

- Para visualizar a Lista de Lembretes, basta filtrar pelo dia 15/01/2023
- Para visualizar a Lista de Médicos com Consulta no dia X, basta filtrar pelo dia 15/01/2023
- Para visualizar a agenda, foi criado três registros que podem ser filtrados pelo dia 18/01/2024 e escolher o médico Callie Torres.
- Podem adicionar, remover, transferir e/ou atualizar qualquer agendamento.

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
