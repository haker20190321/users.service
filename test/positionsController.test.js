const chai = require('chai');
const Models = require('../db/models');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');
const errorLog = console.warn;
const faker = require('faker');

const positionController = require('../controllers/positionsController');
const assert = chai.assert;

chai.should();

const departmentFields = ['id', 'name'];
const positionFields = ['id', 'name', 'departmentId'];
const ext = {Models, logger};

describe('positionController', function() {
  let department = {}, position = {};

  describe('Normal behavior', function() {

    it('should createDepartment', async function() {
      const departmentData = {
        name: `${faker.name.jobType()} ${faker.name.jobArea()}`
      };

      department = await positionController.createDepartment({
        departmentData: {
          value: departmentData
        }
      }, ext, errorLog);

      assert.isObject(department);
      assert.hasAllKeys(department, departmentFields);
      assert.equal(department.name, departmentData.name);
    });

    it('should getDepartment', async function() {
      const res = await positionController.getDepartment({
        departmentId: {
          value: department.id
        }
      }, ext, errorLog);

      assert.isObject(res);
      assert.hasAllKeys(res, departmentFields);
      assert.equal(res.id, department.id);
      assert.equal(res.name, department.name);
    });

    it('should updateDepartment', async function() {
      const name = `${faker.name.jobType()} ${faker.name.jobArea()}`;

      department = await positionController.updateDepartment({
        departmentId: {
          value: department.id
        },
        departmentData: {
          value: {name}
        }
      }, ext, errorLog);

      assert.isObject(department);
      assert.hasAllKeys(department, departmentFields);
      assert.equal(department.name, name);
    });

    it('should searchDepartments', async function() {
      const searchParams = {
        value: {
          limit: 10
        }
      };
      const res = await positionController.searchDepartments({searchParams}, ext, errorLog);

      assert.isArray(res);
      assert.isTrue(res.length <= 10);
    });

    it('should createPosition', async function() {
      const positionData = {
        name: faker.name.jobTitle(),
        departmentId: department.id
      };

      position = await positionController.createPosition({
        positionData: {
          value: positionData
        }
      }, ext, errorLog);

      assert.isObject(position);
      assert.hasAllKeys(position, positionFields);
      assert.strictEqual(position.name, positionData.name);
      assert.strictEqual(position.departmentId, positionData.departmentId);
    });

    it('should updatePosition', async function() {
      const name = faker.name.jobTitle();

      position = await positionController.updatePosition({
        positionId: {
          value: position.id
        },
        positionData: {
          value: {name}
        }
      }, ext, errorLog);

      assert.isObject(position);
      assert.hasAllKeys(position, positionFields);
      assert.strictEqual(position.name, name);
    });

    it('should getPosition', async function() {
      const res = await positionController.getPosition({
        positionId: {
          value: position.id
        }
      }, ext, errorLog);

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

      const res = await positionController.searchPositions({
        searchParams: {
          value: params
        }
      }, ext, errorLog);

      assert.isArray(res);
      assert.isTrue(res.length <= params.limit);
    });

    it('should deletePosition', async function() {
      const res = await positionController.deletePosition({
        positionId: {
          value: position.id
        }
      }, ext, errorLog);

      assert.isObject(res);
      assert.hasAllKeys(res, positionFields);
      assert.equal(res.id, position.id);
    });

    it('should deleteDepartment', async function() {
      const res = await positionController.deleteDepartment({
        departmentId: {
          value: department.id
        }
      }, ext, errorLog);

      assert.isObject(res);
      assert.hasAllKeys(res, departmentFields);
      assert.equal(res.id, department.id);
    });
  });

  describe('Error behavior', function() {

    it('should createDepartment', async function() {
      const departmentData = {
        foo: `${faker.name.jobType()} ${faker.name.jobArea()}`
      };

      const res = await positionController.createDepartment({
        departmentData: {
          value: departmentData
        }
      }, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should getDepartment', async function() {
      const res = await positionController.getDepartment({
        departmentId: {
          value: department.id
        }
      }, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should updateDepartment', async function() {
      const name = `${faker.name.jobType()} ${faker.name.jobArea()}`;

      const res = await positionController.updateDepartment({
        departmentId: {
          value: department.id
        },
        departmentData: {
          value: {name}
        }
      }, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should searchDepartments', async function() {
      const searchParams = {
        value: {
          limit: 10,
          where: {
            badArg: 'yes'
          }
        }
      };
      const res = await positionController.searchDepartments({searchParams}, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should createPosition', async function() {
      const positionData = {
        name: faker.name.jobTitle(),
        departmentId: department.id
      };

      const res = await positionController.createPosition({
        positionData: {
          value: positionData
        }
      }, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should updatePosition', async function() {
      const name = faker.name.jobTitle();

      const res = await positionController.updatePosition({
        positionId: {
          value: position.id
        },
        positionData: {
          value: {name}
        }
      }, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should getPosition', async function() {
      const res = await positionController.getPosition({
        positionId: {
          value: position.id
        }
      }, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should searchPositions', async function() {
      const params = {
        limit: 10,
        offset: 0,
        where: {
          badArg: {[Symbol.for('gte')]: 0}
        },
        order: [
          ['id', 'asc']
        ]
      };

      const res = await positionController.searchPositions({
        searchParams: {
          value: params
        }
      }, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should deletePosition', async function() {
      const res = await positionController.deletePosition({
        positionId: {
          value: position.id
        }
      }, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should deleteDepartment', async function() {
      const res = await positionController.deleteDepartment({
        departmentId: {
          value: department.id
        }
      }, ext, errorLog);

      assert.isUndefined(res);
    });
  });
});