'use strict';

const tableName = 'users';

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable(tableName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    middleName: {
      type: DataTypes.STRING
    },
    fullName: {
      type: DataTypes.STRING
    },
    positionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  })
    .then(() => Promise.all([
      queryInterface.addConstraint(tableName, ['positionId'], {
        type: 'foreign key',
        references: {
          table: 'positions',
          field: 'id'
        },
        onDelete: 'restrict',
        onUpdate: 'cascade'
      }),
      queryInterface.sequelize.query(`
        CREATE OR REPLACE FUNCTION set_full_name()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW."fullName" = 
          trim(CONCAT(NEW."lastName" || ' ', NEW."firstName" || ' ', NEW."middleName"));
          return NEW;
        END;
        $$ LANGUAGE plpgsql;
        
        DROP TRIGGER IF EXISTS trigger_set_full_name ON users;
        
        CREATE  TRIGGER trigger_set_full_name
        BEFORE INSERT OR UPDATE OF "firstName", "lastName", "middleName", "fullName"
        ON users
        FOR EACH ROW EXECUTE PROCEDURE set_full_name();
        
        CREATE EXTENSION IF NOT EXISTS pg_trgm;
        
        DROP INDEX IF EXISTS users_full_name_idx;
        DROP INDEX IF EXISTS users_deleted_at_idx;
        DROP INDEX IF EXISTS users_created_at_idx;
        DROP INDEX IF EXISTS users_is_active_idx;
        
        CREATE INDEX users_full_name_idx ON users USING gin ("fullName" gin_trgm_ops);
        CREATE INDEX users_deleted_at_idx ON users USING btree ("deletedAt");
        CREATE INDEX users_created_at_idx ON users USING btree ("createdAt");
        CREATE INDEX users_is_active_idx ON users USING btree ("isActive");
      `)
    ])),
  down: (queryInterface) => queryInterface.dropTable(tableName)
};