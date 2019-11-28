exports.up = function(knex) {
  return knex.schema.createTable("Products", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("sku").notNullable();
    table.string("image");
    table.string("description");
    table.decimal("price", 12, 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Products");
};
