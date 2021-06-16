## Simple Mail

### Iniciando o servidor

primeiro de tudo, acesse a pasta do servidor
```
cd server
```

comece instalando as dependencias do projeto com:

```
npm install
```

como banco de dados, estamos usando sqlite3 por ser um banco simples e que nao precisa de 
muita configuração
entao agora, execute as migrações

```
npm run knex:migrate
```

após ter feito isso, você já pode iniciar o servidor da aplicação

```
npm run dev
```

### Rotas da aplicação

#### POST /messages
envia uma mensagem

dados que podem ser enviados:
- from: username de quem está enviando a mensagem
- to: username do destinatário que está enviando a mensagem
- subject: assunto da mensagem
- body: conteúdo da mensagem em texto
```
{
	"from": "pedromarquex",
	"to": "receiver",
	"subject": "Envio do premio",
	"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
	 do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
	 veniam."
}
```

retorna as mensagens enviadas para o usuário com usuário igual a :username

#### GET /messages?username=:username
retorna em uma lista as mensagens enviadas para o usuário com usuário igual a :username

#### GET /messages/:id
mostra a mensagem com id igual ao passado como parâmetro na URL

#### PUT /messages/:id
atualiza o conteúdo da mensagem com o id igual ao passado por parâmetro
os dados que podem ser alterados são os mesmos do método post
```
{
	"from": "pedromarquex",
	"to": "receiver",
	"subject": "Envio do premio",
	"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
	 do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
	 veniam."
}
```

#### DELETE /messages/:id
realiza um soft delete da mensagem passada por parâmetro.

### Cliente
Não implementado
