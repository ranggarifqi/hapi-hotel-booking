
exports.up = function(knex) {
  return knex.schema.createTable('rooms', (table) => {
    table.increments('id').primary();
    table.integer('roomTypeId').unsigned();
    table.string('roomNumber').unique().notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('rooms');
};
