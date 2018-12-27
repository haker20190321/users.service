const TABLE_NAME = 'role_right';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists(TABLE_NAME, table => {
      table.bigIncrements('id')
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
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists(TABLE_NAME)
  ])
};
