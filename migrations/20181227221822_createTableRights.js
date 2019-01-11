const TABLE_NAME = 'users_right';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable(TABLE_NAME).then((exist) => {
      if (!exist) {
        return knex.schema.createTable(TABLE_NAME, (table) => {
          table.increments('id')
            .primary()
            .comment('Идентификатор');
          table.string('title', 255)
            .notNullable()
            .comment('Заголовок');
          table.string('name', 255)
            .notNullable()
            .comment('Имя');
        });
      }
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists(TABLE_NAME)
  ]);
};
