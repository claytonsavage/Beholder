exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({id: 1, name: 'Movies'}),
        knex('categories').insert({id: 2, name: 'Books'}),
        knex('categories').insert({id: 3, name: 'Restuarants'}),
        knex('categories').insert({id: 4, name: 'Purchases'})
      ]).then(function(){
        return knex.raw(`ALTER SEQUENCE categories_id_seq RESTART WITH 4`);
      });
    });
};