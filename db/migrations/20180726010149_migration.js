exports.up = function(knex, Promise) {
  return knex.schema.createTable('poll', (table) => {
    table.increments('id')
    table.string('email')
    table.specificType('options', 'text[]')
    table.string('question')
    table.string('url')
    table.specificType('emails', 'text[]')
  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('poll');
};