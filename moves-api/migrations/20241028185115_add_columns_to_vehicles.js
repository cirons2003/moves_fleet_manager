/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('vehicles', (table) => {
        table.integer('user_id').unsigned().notNullable().alter(); // make notNullable

        table.boolean('key_paired').notNullable(); // add new column
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('vehicles', (table) => {
        table.dropColumn('key_paired');
        table.integer('user_id').unsigned().nullable().alter();
    });
};
