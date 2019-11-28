
exports.up = function(knex) {
  return knex.schema.createTable('Users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('fullName').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Users');
};
