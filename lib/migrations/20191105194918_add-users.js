
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('fullName').notNullable();
    table.integer('roleId').unsigned();
    table.foreign('roleId').onDelete('SET NULL').references('roles.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
