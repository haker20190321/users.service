const TABLE_NAME = 'users';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists(TABLE_NAME, table => {
      table.bigIncrements('id')
        .primary()
        .comment('Идентификатор');
      table.uuid('account_id')
        .notNullable()
        .comment('Идентификатор аккаунта oauth-сервера');
      table.string('first_name')
        .notNullable()
        .comment('Имя');
      table.string('last_name')
        .notNullable()
        .comment('Фамилия');
      table.string('middle_name')
        .nullable()
        .comment('Отчество');
      table.boolean('is_active')
        .notNullable()
        .defaultTo(true)
        .comment('Пользователь активен');
      table.timestamp('birthday')
        .nullable()
        .comment('Дата рождения');

      table.index(['last_name', 'first_name', 'middle_name']);
      table.index(['birthday']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists(TABLE_NAME)
  ])
};
