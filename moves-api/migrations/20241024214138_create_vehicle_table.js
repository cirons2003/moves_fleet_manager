/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('vehicles', (table) => {
        table.increments('id').primary();
        table.string('vin', 100);
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('vehicles');
};
