# Sistema de Check-in de Eventos

Este é um sistema de check-in de eventos desenvolvido com Node.js, Express e MongoDB, seguindo a metodologia TDD (Test-Driven Development).

## Arquitetura TDD

O desenvolvimento deste projeto seguiu a metodologia TDD, onde os testes foram escritos antes da implementação das funcionalidades. Isso garante que o código seja testável, robusto e que atenda aos requisitos definidos.

O fluxo de desenvolvimento foi:
1.  **Escrever o teste:** Para cada funcionalidade, um teste foi escrito primeiro, descrevendo o comportamento esperado.
2.  **Ver o teste falhar:** O teste é executado e falha, pois a funcionalidade ainda não foi implementada.
3.  **Escrever o código:** O código necessário para fazer o teste passar é implementado.
4.  **Ver o teste passar:** O teste é executado novamente e passa.
5.  **Refatorar:** O código é refatorado para melhorar a qualidade, sem alterar o comportamento.

## Como Rodar o Projeto

### Pré-requisitos
- Node.js
- MongoDB

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-checkin-eventos.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto e adicione a seguinte variável de ambiente:
   ```
   MONGO_URI=mongodb://localhost:27017/event-checkin
   ```

### Rodando a Aplicação
```bash
npm start
```

### Rodando os Testes
```bash
npm test
```

## Rotas da API

### `POST /register`
Registra um participante em um evento.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "eventId": "60c72b2f9b1d8c001f8e4c6a"
}
```

### `DELETE /register/:participantId`
Cancela a inscrição de um participante.

### `POST /checkin`
Realiza o check-in de um participante em um evento.

**Request Body:**
```json
{
  "participantId": "60c72b2f9b1d8c001f8e4c6c",
  "eventId": "60c72b2f9b1d8c001f8e4c6a"
}
```

### `GET /participants/:email/events`
Lista todos os eventos em que um participante está inscrito.
