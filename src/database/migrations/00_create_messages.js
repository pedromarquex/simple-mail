const knex = require('knex');

async function up(knex) {
    return knex.schema.createTable('messages', table => {
        table.uuid('id').primary();
        table.string('from').notNullable();
        table.string('to').notNullable();
        table.text('subject').notNullable();
        table.text('body').notNullable();
        table.string('forwarded_from');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
    });
}

async function down(knex) {
    return knex.schema.dropTable('messages');
}

module.exports = { up, down }