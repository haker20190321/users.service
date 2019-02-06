const assert = require('chai').assert;
const positionsService = require('../service/positionsService');
const Models = require('../db/models');
const faker = require('faker');

const departmentFields = [
  'id',
  'name'
];

describe('positionsService test', function() {
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

  it('should deleteDepartment', async function() {
    const res = await positionsService.deleteDepartment(department.id, {Models});

    assert.isBoolean(res);
    assert.isTrue(res);
  });
});