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

  it('should deletePosition',async function() {
    const res = await positionsService.deletePosition(position.id, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, positionFields);
    assert.equal(res.id, position.id);
  });

  it('should getPosition after delete', async function() {
    try {
      const res = await positionsService.getPosition(position.id, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `position with id ${position.id} is missing`)
    }
  });

  it('should updatePosition after delete', async function() {
    try {
      const res = await positionsService.updatePosition(position.id, {name: 'foobar'}, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `position with id ${position.id} is missing`)
    }
  });

  it('should deletePosition after delete', async function() {
    try {
      const res = await positionsService.deletePosition(position.id, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `position with id ${position.id} is missing`)
    }
  });

  it('should deleteDepartment', async function() {
    const res = await positionsService.deleteDepartment(department.id, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, departmentFields);
    assert.equal(res.id, department.id);
  });

  it('should getDepartment after delete', async function() {
    try {
      const res = await positionsService.getDepartment(department.id, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `department with id ${department.id} is missing`)
    }
  });

  it('should updateDepartment after delete', async function() {
    try {
      const res = await positionsService.updateDepartment(department.id, {name: 'foobar'}, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `department with id ${department.id} is missing`)
    }
  });

  it('should deleteDepartment after delete', async function() {
    try {
      const res = await positionsService.deleteDepartment(department.id, {Models});
      assert.isUndefined(res);
    } catch(e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `department with id ${department.id} is missing`)
    }
  });
});