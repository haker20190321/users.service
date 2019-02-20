'use strict';

const tableName = 'settings';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })
    .then(() => Promise.all([
      queryInterface.addConstraint(tableName, ['userId'], {
        type: 'foreign key',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        name: `${tableName}_userId_users_fk`
      }),
      queryInterface.addConstraint(tableName, ['userId', 'key'], {
        type: 'primary key',
        name: `${tableName}_pk`
      }),
      queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS ${tableName}_user_id_idx;
        CREATE INDEX ${tableName}_user_id_idx ON ${tableName} USING btree ("userId");
        
        DROP INDEX IF EXISTS ${tableName}_key_idx;
        CREATE INDEX ${tableName}_key_idx ON ${tableName} USING btree ("key");
      `)
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
    .then(() => Promise.all([
      queryInterface.removeConstraint(tableName, `${tableName}_pk`),
      queryInterface.removeConstraint(tableName, `${tableName}_userId_users_fk`)
    ]))
};