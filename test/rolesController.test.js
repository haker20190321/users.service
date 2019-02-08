const chai = require('chai');
const Models = require('../db/models');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');
const errorLog = console.warn;
const faker = require('faker');

const rolesController = require('../controllers/rolesController');
const {createUser, deleteUser} = require('../service/usersService');

const assert = chai.assert;

chai.should();

const {makeUser} = require('./helper');
const {AuthSuccess} = require('./mockOAuth');
const rightFields = ['id', 'title', 'name'];
const roleFields = ['id', 'title'];
const userRoleFields = ['userId', 'roleId'];
const roleRightFields = ['rightId', 'roleId'];
const ext = {Models, logger};

describe('rolesController', function() {
  let user = {}, role = {}, right = {};

  it('create user for test', async function () {
    user = await createUser(await makeUser(), {Models, logger, OAuth: new AuthSuccess()});
  });

  it('should createRole', async function() {
    const params = {
      title: faker.name.jobType()
    };

    role = await rolesController.createRole({
      roleData: {
        value: params
      }
    }, ext, errorLog);

    assert.isObject(role);
    assert.hasAllKeys(role, roleFields);
  });

  it('should getRole', async function() {
    const res = await rolesController.getRole({
      roleId: {
        value: role.id
      }
    }, ext, errorLog);

    assert.isObject(res);
    assert.hasAllKeys(res, roleFields);
    assert.equal(role.id, res.id);
    assert.equal(role.title, res.title);
  });

  it('should searchRoles', async function() {
    const params = {
      limit: 4
    };

    const res = await rolesController.searchRoles({
      searchParams: {
        value: params
      }
    }, ext, errorLog);

    assert.isArray(res);
    assert.isTrue(res.length <= params.limit);
    res.forEach(item => assert.hasAllKeys(item, roleFields));
  });

  it('should updateRole', async function() {
    const title = faker.name.jobType();
    const res = await rolesController.updateRole({
      roleId: {
        value: role.id
      },
      roleData: {
        value: {title}
      }
    }, ext, errorLog);

    assert.isObject(res);
    assert.hasAllKeys(res, roleFields);
    assert.equal(res.title, title);
    assert.equal(res.id, role.id);

    role = res;
  });

  it('should createRight', async function() {
    const params = {
      title: faker.name.jobArea(),
      name: faker.name.jobType()
    };

    right = await rolesController.createRight({
      rightData: {
        value: params
      }
    }, ext, errorLog);

    assert.isObject(right);
    assert.hasAllKeys(right, rightFields);
    assert.equal(right.title, params.title);
    assert.equal(right.name, params.name);
  });

  it('should getRight', async function() {
    const res = await rolesController.getRight({
      rightId: {
        value: right.id
      }
    }, ext, errorLog);

    assert.isObject(res);
    assert.hasAllKeys(res, rightFields);
    assert.equal(res.id, right.id);
    assert.equal(res.title, right.title);
    assert.equal(res.name, right.name);
  });

  it('should searchRights', async function() {
    const params = {
      limit: 2
    };

    const res = await rolesController.searchRights({
      searchParams: {
        value: params
      }
    }, ext, errorLog);

    assert.isArray(res);
    assert.isTrue(res.length <= params.limit);
    res.forEach(item => assert.hasAllKeys(item, rightFields));
  });

  it('should updateRight', async function() {
    const title = faker.name.jobArea();
    const res = await rolesController.updateRight({
      rightId: {
        value: right.id
      },
      rightData: {
        value: {title}
      }
    }, ext, errorLog);

    assert.isObject(res);
    assert.hasAllKeys(res, rightFields);
    assert.equal(res.id, right.id);
    assert.equal(res.name, right.name);
    assert.equal(res.title, title);

    right = res;
  });

  it('should setRoleRights', async function() {
    const res = await rolesController.setRoleRights({
      roleId: {
        value: role.id
      },
      rightsIds: {
        value: [right.id]
      }
    }, ext, errorLog);

    assert.isArray(res);
    assert.isNotEmpty(res);
    res.forEach(item => {
      assert.hasAllKeys(item, roleRightFields);
      assert.equal(item.roleId, role.id);
      assert.isTrue([right.id].includes(item.rightId))
    })
  });

  it('should deleteRoleRight', async function() {
    const res = await rolesController.deleteRoleRight({
      roleId: {
        value: role.id
      },
      rightId: {
        value: right.id
      }
    }, ext, errorLog);

    assert.isBoolean(res);
    assert.isTrue(res);
  });

  it('should addRoleRight', async function() {
    const res = await rolesController.addRoleRight({
      roleId: {
        value: role.id
      },
      rightId: {
        value: right.id
      }
    }, ext, errorLog);

    assert.isObject(res);
    assert.hasAllKeys(res, roleRightFields);
    assert.equal(res.roleId, role.id);
    assert.equal(res.rightId, right.id);
  });

  it('should setUserRoles', async function() {
    const res = await rolesController.setUserRoles({
      userId: {
        value: user.id
      },
      rolesIds: {
        value: [role.id]
      }
    }, ext, errorLog);

    assert.isArray(res);
    assert.isNotEmpty(res);
    res.forEach(item => {
      assert.hasAllKeys(item, userRoleFields);
      assert.equal(item.userId, user.id);
      assert.isTrue([role.id].includes(role.id));
    })
  });

  it('should deleteUserRole', async function() {
    const res = await rolesController.deleteUserRole({
      userId: {
        value: user.id
      },
      roleId: {
        value: role.id
      }
    }, ext, errorLog);

    assert.isBoolean(res);
    assert.isTrue(res);
  });

  it('should addUserRole', async function() {
    const res = await rolesController.addUserRole({
      userId: {
        value: user.id
      },
      roleId: {
        value: role.id
      }
    }, ext, errorLog);

    assert.isObject(res);
    assert.hasAllKeys(res, userRoleFields);
    assert.equal(res.userId, user.id);
    assert.equal(res.roleId, role.id);
  });

  it('should deleteRight', async function() {
    const res = await rolesController.deleteRight({
      rightId: {
        value: right.id
      }
    }, ext, errorLog);

    assert.isBoolean(res);
    assert.isTrue(res);
  });

  it('should deleteRole', async function() {
    const res = await rolesController.deleteRole({
      roleId: {
        value: role.id
      }
    }, ext, errorLog);

    assert.isBoolean(res);
    assert.isTrue(res);
  });

  it('delete user for test', async function () {
    user = await deleteUser(user.id, {Models, logger});
  });
});