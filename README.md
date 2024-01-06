![Logo do projeto](https://raw.githubusercontent.com/oMatheus-Farias/webbarberpro/main/public/mockup-BarberPRO.png)

# BarberPRO

BarberPRO é uma aplicação web full stack desenvolvida para atender às necessidades específicas de barbearias, proporcionando uma gestão eficiente dos serviços, cortes e informações dos clientes. O sistema foi construído utilizando tecnologias modernas como NextJS, TypeScript, Context API, TailwindCSS, NodeJS, PostgreSQL, Prisma, e Git.

## 🔥 Funcionalidades Principais

- **API Segura com NodeJS:** Uma API robusta foi desenvolvida em NodeJS para gerenciar as requisições da aplicação, garantindo eficiência e segurança.
- **Cadastro e Login Seguros:** Sistema de cadastro e login seguro com criptografia de senha, geração de token JWT para autenticação e páginas de cadastro e login acessíveis apenas por usuários deslogados.
- **Dashboard:** Ao logar, os usuários são redirecionados para o dashboard, onde a agenda da barbearia é exibida. Informações sobre serviços cadastrados incluem nome do cliente, tipo de corte e preço. Possibilidade de finalizar um serviço, removendo-o do banco de dados.
- **Página de Cortes:** Lista de cortes cadastrados pelo usuário, com opção de filtrar entre ativos e inativos. Usuários premium podem cadastrar quantos modelos de corte desejarem; não premium têm limite de três cortes. Botão de cadastrar novo direciona para a página de cadastro de modelo de corte.
Página de editar modelo acessível apenas para usuários premium.
- **Minha Conta:** Os usuários podem editar o nome da barbearia e adicionar um endereço. Opção de fazer logout da conta. Indicação do plano do usuário (premium ou gratuito). Botão para mudar de plano direciona para a página de Planos.
- **Planos:** Página com informações detalhadas sobre os planos (gratuito e premium). Botão "Virar Premium" para usuários gratuitos. Mensagem indicando que o usuário já é premium, com opção de mudar de plano para usuários premium.
  
### ⚙️ Pré-requisitos

- npm ou yarn

### 🔨 Guia de instalação

1. Clone o repositório: `git clone https://github.com/oMatheus-Farias/webbarberpro.git`>
2. Navegue até o diretório do projeto: `cd webbarberpro`
3. Instale as dependências: `npm install` (ou use o gerenciador de pacotes apropriado)
4. Inicie o servidor: `npm run dev` (ou use o comando adequado)
5. O aplicativo estará disponível no localhost que aparecera no seu painel ex: [http://localhost:3000](http://localhost:3000/)

### 📦 Tecnologias usadas

* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
* ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
* ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)


### 📄 Licença

Este projeto está sob a [Licença MIT](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)
