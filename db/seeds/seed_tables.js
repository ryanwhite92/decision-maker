
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('poll').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('poll')
          .insert({
            email: 'hello@myemail.com',
            options: ['beach', 'dak', 'uvic', 'mt doug'],
            question: "Where do you want to meet?",
            url: "sdafasgdfg",
            emails: ['admin@example.com', 'user@example.com', 'user@email.com']
          }),
        knex('poll')
          .insert({
            email: 'admin@myemail.com',
            options: ['dak', 'uvic', 'beach', 'mt finlayson'],
            question: "Where do you want to meet?",
            url: "sdbvcxngdf",
            emails: ['admin1@example.com', 'user1@example.com', 'user1@email.com']
          }),
        knex('response')
          .insert({
            ranks: [4,3,2,1],
            email: 'admin1@example.com',
            poll_url: "sdafasgdfg"
          })
      ]);
    });
};
