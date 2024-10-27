import knex from 'knex';

const knexFile = require('../../knexfile');

export const knexObj = knex(knexFile);
