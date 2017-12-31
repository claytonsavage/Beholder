exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Clayton', email: 'Clayton@clayton.com', password: 'clayton'}),
        knex('users').insert({id: 2, name: 'Konrad', email: 'konrad@konrad.com', password: 'konrad' }),
        knex('users').insert({id: 3, name: 'Cody', email: 'cody@cody.com', password: 'cody' }),
        knex('users').insert({id: 4, name: 'bill', email: 'bill@email.com', password: 'bill' })
      ]).then(function(){
        return knex.raw(`ALTER SEQUENCE users_id_seq RESTART WITH 4`);
      });
    });
};




