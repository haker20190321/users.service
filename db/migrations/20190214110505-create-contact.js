'use strict';

const tableName = 'contacts';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['phone', 'email']
    },
    value: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE
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
        onUpdate: 'cascade'
      }),
      queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS ${tableName}_deleted_at_idx;
        CREATE INDEX ${tableName}_deleted_at_idx ON ${tableName} USING btree ("deletedAt");
        
        DROP INDEX IF EXISTS ${tableName}_type_idx;
        CREATE INDEX ${tableName}_type_idx ON ${tableName} USING btree ("type");
        
        DROP INDEX IF EXISTS ${tableName}_value_idx;
        CREATE INDEX ${tableName}_value_idx ON ${tableName} USING gin ("value" gin_trgm_ops);
      `)
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};