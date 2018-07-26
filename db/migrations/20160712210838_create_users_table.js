exports.up = function(knex, Promise) {
  knex.schema.hasTable('poll').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('poll', (table) => {
        table.increments('id')
        table.string('email')
        table.integer('options')
        table.integer[]('options')
        table.string('question')
        table.string('url')
        table.string[]('emails')
      });
    }
  });

  knex.schema.hasTable('response').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('response', (table) => {
        table.increments('id')
        table.string[]('ranks')
        table.string('poll_url')
      });
    }
  });
};



exports.down = function(knex, Promise) {
  return knex.schema.dropTable('poll').dropTable('response');
};