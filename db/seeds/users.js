exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Clayton', email: 'Clayton@clayton.com', password: 'clayton'}),
        knex('users').insert({id: 2, name: 'Konrad', email: 'konrad@konrad.com', password: 'konrad' }),
        knex('users').insert({id: 3, name: 'Cody', email: 'cody@cody.com', password: 'cody' })
      ]);
    });
};

exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({id: 1, name: 'Movies'}),
        knex('categories').insert({id: 2, name: 'Books'}),
        knex('categories').insert({id: 3, name: 'Restuarants'}),
        knex('categories').insert({id: 4, name: 'Purchases'})
      ]);
    });
};


exports.seed = function(knex, Promise) {
  return knex('todo_list').del()
    .then(function () {
      return Promise.all([
        knex('todo_list').insert({id: 1, todo: 'Watch Star Wars', user_id: 2, category_id: 1, completed: false }),
        knex('todo_list').insert({id: 2, todo: 'Read The Hobbit', user_id: 1, category_id: 2, completed: true }),
        knex('todo_list').insert({id: 3, todo: 'Eat at Mcdonalds', user_id: 3, category_id: 3, completed: false }),
        knex('todo_list').insert({id: 4, todo: 'Buy toilet paper', user_id: 2, category_id: 4, completed: false }),
      ]);
    });
};