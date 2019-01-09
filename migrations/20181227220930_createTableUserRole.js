const TABLE_NAME = 'users_user_role';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable(TABLE_NAME).then(exist => {
      if (!exist) {
        return knex.schema.createTable(TABLE_NAME, table => {
          table.bigIncrements('id')
            .primary()
            .comment('Идентификатор');
          table.bigInteger('user_id')
            .notNullable()
            .comment('Идентификатор пользователя');
          table.bigInteger('role_id')
            .notNullable()
            .comment('Идентификатор роли');

          table.index(['user_id']);
          table.index(['role_id']);
        });
      }
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists(TABLE_NAME)
  ])
};
