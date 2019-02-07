const assert = require('chai').assert;
const positionsService = require('../service/positionsService');
const Models = require('../db/models');
const faker = require('faker');

const departmentFields = [
  'id',
  'name'
];

const positionFields = [
  'id',
  'name',
  'departmentId'
];

describe('positionsService test', function() {
  describe('normal behavior', function() {
    let department;

    it('should createDepartment', async function() {
      const params = {
        name: `${faker.name.jobType()} ${faker.name.jobArea()}`
      };

      department = await positionsService.createDepartment(params, {Models});

      assert.hasAllKeys(department, departmentFields);
      assert.strictEqual(department.name, params.name);
    });

    it('should updateDepartment', async function() {
      const params = {
        name: `${faker.name.jobType()} ${faker.name.jobArea()}`
      };

      department = await positionsService.updateDepartment(department.id, params, {Models});

      assert.hasAllKeys(department, departmentFields);
      assert.strictEqual(department.name, params.name);
    });

    it('should getDepartment', async function() {
      const res = await positionsService.getDepartment(department.id, {Models});

      assert.hasAllKeys(res, departmentFields);
      assert.strictEqual(res.name, department.name);
      assert.strictEqual(res.id, department.id);
    });

    it('should searchDepartments', async function() {
      const params = {
        limit: 10,
        offset: 0,
        where: {
          id: {[Symbol.for('gte')]: 0}
        },
        order: [
          ['id', 'asc']
        ]
      };
      const res = await positionsService.searchDepartments(params, {Models});

      assert.isArray(res);
      assert.isTrue(res.length <= params.limit);
    });

    let position;

    it('should createPosition', async function() {
      const params = {
        name: faker.name.jobTitle(),
        departmentId: department.id
      };

      position = await positionsService.createPosition(params, {Models});

      assert.isObject(position);
      assert.hasAllKeys(position, positionFields);
      assert.strictEqual(position.name, params.name);
      assert.strictEqual(position.departmentId, params.departmentId);
    });

    it('should updatePosition', async function() {
      const params = {
        name: faker.name.jobTitle()
      };

      position = await positionsService.updatePosition(position.id, params, {Models});

      assert.isObject(position);
      assert.hasAllKeys(position, positionFields);
      assert.strictEqual(position.name, params.name);
    });

    it('should getPosition', async function() {
      const res = await positionsService.getPosition(position.id, {Models});

      assert.isObject(res);
      assert.hasAllKeys(res, positionFields);
      assert.strictEqual(res.id, position.id);
      assert.strictEqual(res.name, position.name);
      assert.strictEqual(res.departmentId, position.departmentId);
    });

    it('should searchPositions', async function() {
      const params = {
        limit: 10,
        offset: 0,
        where: {
          id: {[Symbol.for('gte')]: 0}
        },
        order: [
          ['id', 'asc']
        ]
      };

      const res = await positionsService.searchPositions(params, {Models});

      assert.isArray(res);
      assert.isTrue(res.length <= params.limit);
    });

    //todo set user position

    // delete

    it('should deletePosition',async function() {
      const res = await positionsService.deletePosition(position.id, {Models});

      assert.isBoolean(res);
      assert.isTrue(res);
    });

    it('should deleteDepartment', async function() {
      const res = await positionsService.deleteDepartment(department.id, {Models});

      assert.isBoolean(res);
      assert.isTrue(res);
    });
  });

  describe('error behavior', function() {

  });
});