const TABLE_NAME = 'users_role_right';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable(TABLE_NAME).then((exist) => {
      if (!exist) {
        return knex.schema.createTable(TABLE_NAME, (table) => {
          table.increments('id')
            .primary()
            .comment('Идентификатор');
          table.bigInteger('role_id')
            .notNullable()
            .comment('Идентификатор роли');
          table.bigInteger('right_id')
            .notNullable()
            .comment('Идентификатор права');

          table.index(['role_id']);
          table.index(['right_id']);
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
