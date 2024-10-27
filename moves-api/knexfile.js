// knexfile.js
require('dotenv').config();
const knex = require('knex');

module.exports = {
    client: 'pg',
    connection: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
    },
    migrations: { directory: './migrations' },
    pool: { min: 2, max: 10 },
};
