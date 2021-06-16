const knex = require('../database/connection');
const { v4: uuidV4 } = require('uuid');

const { getPostData } = require('../utils/getPostData');

class MessageController {
    // send a message
    async create(request, response) {
        const data = await getPostData(request);

        const message = { ...data, id: uuidV4() }

        await knex('messages').insert(message);

        response.writeHead(201, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(message));
    }

    // lists all messages sent to a user
    async index(request, response, username) {
        const messages = await knex
            .select('*')
            .from('messages')
            .where({ to: username, deleted_at: null });

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(messages));
    }

    // get a message by id
    async show(request, response, id) {
        const message = await knex
            .select('*')
            .from('messages')
            .where({ id });

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(message[0]));
    }

    // perform a soft delete
    async destroy(request, response, id) {
        await knex('messages').where({ id }).update({ deleted_at: new Date() })

        response.writeHead(204, {'Content-Type': 'application/json'});
        response.end();
    }

    // update message
    async update(request, response, id) {
        const data = await getPostData(request);

        await knex('messages').where({ id }).update({ ...data }).returning('*');

        const updatedMessage = await knex.select('*').from('messages').where({ id })

            response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(updatedMessage[0]));

    }
}

module.exports = { MessageController }