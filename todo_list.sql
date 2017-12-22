  exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todo_list', function(table){
      table.increments('id'),
      table.string('todo'),
      table.foreign('user_id').references('users.id'),
      table.foreign('category_id').references('categories.id'),
      table.boolean('completed');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todo_list');
  ]);
};