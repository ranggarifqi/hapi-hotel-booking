
exports.up = function(knex) {
  return knex.schema.createTable('bookings', (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable();
    table.integer('roomId').unsigned().notNullable();
    table.date('checkInAt').notNullable();
    table.date('checkOutAt').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('bookings');
};
