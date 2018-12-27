const TABLE_NAME = 'roles';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists(TABLE_NAME, table => {
      table.bigIncrements('id')
        .primary()
        .comment('Идентификатор');
      table.string('title', 255)
        .notNullable()
        .comment('Заголовок');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists(TABLE_NAME)
  ])
};
