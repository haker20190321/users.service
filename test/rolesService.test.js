const assert = require('chai').assert;
const rolesService = require('../service/rolesService');
const {createUser, deleteUser} = require('../service/usersService');
const Models = require('../db/models');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');
const randomstring = require('randomstring');
const {makeUser} = require('./helper');
const {AuthSuccess} = require('./mockOAuth');
const rightFields = ['id', 'title', 'name'];
const roleFields = ['id', 'title'];
const userRoleFields = ['userId', 'roleId'];
const roleRightFields = ['rightId', 'roleId'];

describe('rolesService test', function () {
  let rightId, roleId, user;

  it('create user for test', async function () {
    user = await createUser(await makeUser(), {Models, logger, OAuth: new AuthSuccess()});
  });

  it('should createRight', async function () {
    const right = {
      title: `roleTitle${randomstring.generate(5)}`,
      name: randomstring.generate(10)
    };
    const res = await rolesService.createRight(right, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, rightFields);
    assert.isNumber(res.id);
    assert.isTrue(res.id > 0);
    for (const key in right) {
      assert.equal(res[key], right[key]);
    }
    rightId = res.id;
  });

  it('should getRight', async function () {
    const res = await rolesService.getRight(rightId, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, rightFields);
    assert.strictEqual(rightId, res.id);
  });

  it('should searchRights', async function () {
    const res = await rolesService.searchRights({
      limit: 10,
      offset: 0,
      where: {
        id: {[Symbol.for('gte')]: 0}
      }
    }, {Models, logger});

    assert.isArray(res);
    assert.isTrue(res.length > 0);
  });

  it('should updateRight', async function () {
    const rightTitle = 'ebobo';
    const res = await rolesService.updateRight(rightId, {title: rightTitle}, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, rightFields);
    assert.strictEqual(rightTitle, res.title);
    assert.strictEqual(rightId, res.id);
  });

  it('should createRole', async function () {
    const roleData = {title: randomstring.generate(12)};
    const res = await rolesService.createRole(roleData, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, roleFields);

    roleId = res.id;
  });

  it('should getRole', async function () {
    const res = await rolesService.getRole(roleId, false, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, roleFields);
    assert.strictEqual(roleId, res.id);
  });

  it('should getRole with rights', async function () {
    const res = await rolesService.getRole(roleId, true, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, [...roleFields, 'rights']);
    assert.strictEqual(roleId, res.id);
  });

  it('should searchRoles', async function () {
    const res = await rolesService.searchRoles({
      limit: 10,
      offset: 0,
      where: {
        id: {$eq: roleId}
      }
    }, false, {Models, logger});

    assert.isArray(res);
    assert.isTrue(res.length > 0);
  });

  it('should searchRoles with rights', async function () {
    const res = await rolesService.searchRoles({
      limit: 10,
      offset: 0,
      where: {
        id: {$eq: roleId}
      }
    }, true, {Models, logger});

    assert.isArray(res);
    assert.isTrue(res.length > 0);
  });

  it('should updateRole', async function () {
    const title = randomstring.generate(10);
    const res = await rolesService.updateRole(roleId, {title}, {Models});

    assert.isObject(res);

    assert.hasAllKeys(res, roleFields);
    assert.strictEqual(title, res.title);
    assert.strictEqual(roleId, res.id);
  });

  it('should setUserRoles', async function () {
    const res = await rolesService.setUserRoles(user.id, [roleId], {Models});

    assert.isArray(res);
    assert.isTrue(res.length > 0);
    res.forEach((userRole) => {
      assert.hasAllKeys(userRole, userRoleFields);
      assert.equal(userRole.userId, user.id);
      assert.equal(userRole.roleId, roleId)
    })
  });

  it('should deleteUserRole', async function () {
    const res = await rolesService.deleteUserRole(user.id, roleId, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, userRoleFields);
    assert.equal(user.id, res.userId);
    assert.equal(roleId, res.roleId);
  });

  it('should addUserRole', async function () {
    const res = await rolesService.addUserRole(user.id, roleId, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, userRoleFields);
    assert.equal(res.userId,  user.id);
    assert.equal(res.roleId, roleId);
  });

  it('should setRoleRights', async function () {
    const res = await rolesService.setRoleRights(roleId, [rightId], {Models});

    assert.isArray(res);
    assert.isTrue(res.length === 1);
    res.forEach(roleRight => {
      assert.equal(roleRight.roleId, roleId);
      assert.equal(roleRight.rightId, rightId);
    })
  });

  it('should deleteRoleRight', async function () {
    const res = await rolesService.deleteRoleRight(roleId, rightId, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, roleRightFields);
    assert.equal(roleId, res.roleId);
    assert.equal(rightId, res.rightId);
  });

  it('should addRoleRight', async function () {
    const res = await rolesService.addRoleRight(roleId, rightId, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, roleRightFields);
    assert.equal(res.rightId, rightId);
    assert.equal(res.roleId, roleId);
  });


  it('should deleteRight', async function () {
    const res = await rolesService.deleteRight(rightId, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, rightFields);
    assert.equal(res.id, rightId);
  });

  it('should getRight after delete', async function() {
    try {
      const res = await rolesService.getRight(rightId, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `right with id ${rightId} is missing`)
    }
  });

  it('should updateRight after delete', async function() {
    try {
      const res = await rolesService.updateRight(rightId, {title: 'foobar'}, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `right with id ${rightId} is missing`)
    }
  });

  it('should deleteRole', async function () {
    const res = await rolesService.deleteRole(roleId, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, roleFields);
    assert.equal(res.id, roleId);
  });

  it('should getRole after delete', async function() {
    try {
      const res = await rolesService.getRole(roleId, false, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `role with id ${roleId} is missing`)
    }
  });

  it('should updateRole after delete', async function() {
    try {
      const res = await rolesService.updateRole(roleId, {title: 'foobar'}, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `role with id ${roleId} is missing`)
    }
  });

  it('should delete test user', async function () {
    const res = await deleteUser(user.id, {Models, logger});

    assert.isBoolean(res);
    assert.isTrue(res);
  });
});