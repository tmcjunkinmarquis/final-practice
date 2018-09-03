exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('breeds', function (table) {
      table.increments('id').primary();
      table.string('breed_name');
      table.string('country_of_origin');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('pets', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('age');
      table.string('color');
      table.integer('breed_id').unsigned();
      table.foreign('breed_id')
        .references('breeds.id');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pets'),
    knex.schema.dropTable('breeds')
  ]);
};
