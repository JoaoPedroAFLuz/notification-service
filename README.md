# 🔔 Notification Service

Microsserviço com propósito de auxiliar outros serviços a emitirem notificações para usuários. É possível que serviços externos se comuniquem com este microsseviço por uma API REST ou por meio de mensageria utilizando o Apache Kafka.

## Instalação
- Clone o projeto na sua máquina com o comando:
```bash
git clone https://github.com/JoaoPedroLuz57/notification-service.git
```
- Instale as dependências com o comando:
```bash
npm install
```

## Executando a aplicação
- Para rodar em modo de desenvolvimento utilize o comando:
```bash
npm run dev
```
- Para realizar os testes unitários utilize o comando: 
```bash
npm run dev
```

## Rotas da aplicação

- (GET) Listar todas as notificações do usuário: `http://localhost:3000/notifications/:recipientId` 
- (GET) Contar o total de notificações do usuário: `localhost:3000/notifications/:recipientId/count`
- (POST) Criar uma nova notificação: `http://localhost:3000/notifications`
  passando os atributos: 
  ```json
   {
    "recipientId": "uuid",
    "content": "some content",
    "category": "category name"
   }
   ```
- (PATCH) Marcar notificação como lida: `http://localhost:3000/notifications/:id/read`
- (PATCH) Marcar notificação como não lida: `http://localhost:3000/notifications/:id/unread`
- (PATCH) Cancelar o envio de uma notificação: `http://localhost:3000/notifications/:id/cancel`

# Utilizando mensageria com Apache Kafka

- É necessário que tenha um cluster do Apache Kafka para utilizar esta funcionalidade. Pode-se subir um utilizando o Docker ou, caso queria, pode-se criar um gratuitamente no [upstash](https://upstash.com/).    
- Com o cluster criado substitua as informações necessárias no arquivo `src/infra/messaging/kafka/kafka-consumer.service.ts`.
- Um exemplo de produtor de eventos (notificações) pode ser visto no meu repositório [notification-producer](https://github.com/JoaoPedroLuz57/notification-producer).
