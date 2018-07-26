
exports.up = function(knex, Promise) {
    return knex.schema.createTable('response', (table) => {
    table.increments('id')
    table.specificType('ranks', 'integer[]')
    table.string('poll_url')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('response');
};
