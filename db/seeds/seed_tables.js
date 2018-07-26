
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('poll').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('poll').insert({id: 1, email: 'hello@myemail.com', question: "Where do you want to meet?", url: "sdafasgdfg"})
      ]);
    });
};
