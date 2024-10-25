
type PrimaryKey = {
    id: number;
}

type NonNullable = {
    email: string;
    password: string;
    tesla_access_token: string;
    tesla_refresh_token: string;
}

type Nullable = {
    tesla_access_token: string;
    tesla_refresh_token: string;
}
table.increments('id').primary();
table.string('email', 255).notNullable();
table.string('password', 64).notNullable();
table.string('tesla_access_token', 1500);
table.string('tesla_refresh_token', 1500);
table.timestamp('created_at').defaultTo(knex.fn.now());
});