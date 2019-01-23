const assert = require('chai').assert;
const rolesService = require('../service/rolesService');
const Models = require('../db/models');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');
const randomstring = require('randomstring');

describe('rolesControlle test', function () {
  describe('Normal behavior', function () {
    let rightId, roleId;

    it('should createRight', async function () {
      const right = {
        title: `roleTitle${randomstring.generate(5)}`,
        name: randomstring.generate(10)
      };
      const res = await rolesService.createRight(right, {Models});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['id', 'title', 'name']);
      assert.isNumber(res.id);
      assert.isTrue(res.id > 0);
      for (const key in right) {
        assert.equal(res[key], right[key]);
      }
      rightId = res.id;
    });

    it('should getRight', async function () {
      const res = await rolesService.getRight(rightId, {Models});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['id', 'title', 'name']);
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

      assert.typeOf(res, 'array');
      assert.isTrue(res.length > 0);
    });

    it('should updateRight', async function () {
      const rightTitle = 'ebobo';
      const res = await rolesService.updateRight(rightId, {title: rightTitle}, {Models});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['id', 'title', 'name']);
      assert.strictEqual(rightTitle, res.title);
      assert.strictEqual(rightId, res.id);
    });

    it('should deleteRight', async function () {
      const res = await rolesService.deleteRight(rightId, {Models});

      assert.typeOf(res, 'boolean');
      assert.isTrue(res);
    });

    it('should createRole', async function () {
      const roleData = {title: randomstring.generate(12)};
      const res = await rolesService.createRole(roleData, {Models});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['id', 'title']);

      roleId = res.id;
    });

    it('should getRole', async function () {
      const res = await rolesService.getRole(roleId, {Models});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['id', 'title']);
      assert.strictEqual(roleId, res.id);
    });

    it('should searchRoles', async function () {
      const res = await rolesService.searchRoles({
        limit: 10,
        offset: 0,
        where: {
          id: {[Symbol.for('gte')]: 0}
        }
      }, {Models, logger});

      assert.typeOf(res, 'array');
      assert.isTrue(res.length > 0);
    });

    it('should updateRole', async function () {
      const title = randomstring.generate(10);
      const res = await rolesService.updateRole(roleId, {title}, {Models});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['id', 'title']);
      assert.strictEqual(title, res.title);
      assert.strictEqual(roleId, res.id);
    });

    it('should deleteRole', async function () {
      const res = await rolesService.deleteRole(roleId, {Models});

      assert.typeOf(res, 'boolean');
      assert.isTrue(res);
    });

    it('should setUserRoles', async function () {
      const res = await
    });

    it('should addUserRole', function () {

    });

    it('should deleteUserRole', function () {

    });
  });

  describe('Error behavior', function () {

  })
});