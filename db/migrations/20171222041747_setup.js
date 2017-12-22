exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todo_list', function(table){
      table.increments('id'),
      table.string('todo');
      table.integer('user_id').unsigned().references('users.id');
      table.integer('category_id').unsigned().references('categories.id');
      table.boolean('completed');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todo_list')
  ]);
};