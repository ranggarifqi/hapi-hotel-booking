
exports.up = function(knex) {
  return knex.schema.createTable('rooms', (table) => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.string('description').notNullable();
    table.string('image');
    table.decimal('price', 10, 2);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('rooms');
};
