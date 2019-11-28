
exports.up = function(knex) {
  return knex.schema.createTable('room_types', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('image');
    table.integer('qty');
    table.decimal('price', 10, 2);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('room_types');
};
