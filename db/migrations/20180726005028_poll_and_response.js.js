exports.up = function(knex, Promise) {
  return knex.schema.createTable('poll', (table) => {
    table.increments('id')
    table.string('email')
    table.integer('options')
    table.array('options')
    table.string('question')
    table.string('url')
    table.array('emails')
  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('poll');
};