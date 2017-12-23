exports.seed = function(knex, Promise) {
  return knex('todo_list').del()
    .then(function () {
      return Promise.all([
        knex('todo_list').insert({id: 1, todo: 'Watch Star Wars', user_id: 2, category_id: 1, completed: false }),
        knex('todo_list').insert({id: 2, todo: 'Read The Hobbit', user_id: 1, category_id: 2, completed: true }),
        knex('todo_list').insert({id: 3, todo: 'Eat at Mcdonalds', user_id: 3, category_id: 3, completed: false }),
        knex('todo_list').insert({id: 4, todo: 'Buy toilet paper', user_id: 2, category_id: 4, completed: false }),
      ]).then(function(){
        return knex.raw(`ALTER SEQUENCE todo_list_id_seq RESTART WITH 4`)
      });
    }) ;
};