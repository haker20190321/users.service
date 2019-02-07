'use strict';

module.exports = {
  /**
   * Create department
   * @param {Object} params
   * @param {Object} Models
   * @return {Promise<*>}
   */
  createDepartment: async(params, {Models}) => {
    const department = await Models.Department.create(params);

    return department.get({plain: true});
  },
  /**
   * Get department
   * @param {Number} departmentId
   * @param {Object} Models
   * @return {Promise<Object|any>}
   */
  getDepartment: async(departmentId, {Models}) => {
    const department = await Models.Department.findByPk(departmentId);

    if (!department) {
      throw new Error(`department with id ${departmentId} is missing`);
    }

    return department.get({plain: true});
  },
  /**
   * Update department
   * @param {Number} departmentId
   * @param {Object} params
   * @param {Object} Models
   * @return {Promise<Object|any>}
   */
  updateDepartment: async(departmentId, params, {Models}) => {
    const department = await Models.Department.findByPk(departmentId);

    if (!department) {
      throw new Error(`department with id ${departmentId} is missing`);
    }

    await department.update(params, {
      fields: ['name']
    });

    return department.get({plain: true});
  },
  /**
   * Search departments
   * @param limit
   * @param offset
   * @param where
   * @param order
   * @param Models
   * @return {Promise<(Object|any)[]>}
   */
  searchDepartments: async({limit, offset, where, order}, {Models}) => {
    const departments = await Models.Department.findAll({
      limit,
      offset,
      where,
      order
    });

    return departments.map((item) => item.get({plain: true}));
  },
  /**
   * Delete department
   * @param departmentId
   * @param Models
   * @return {Promise<boolean>}
   */
  deleteDepartment: async(departmentId, {Models}) => {
    const department = await Models.Department.findByPk(departmentId);

    if (!department) {
      throw new Error(`department with id ${departmentId} is missing`);
    }

    await department.destroy();

    return true;
  },
  createPosition: async(params, {Models}) => {
    const position = await Models.Position.create(params);

    return position.get({plain: true});
  },
  updatePosition: async(positionId, params, {Models}) => {
    const position = await Models.Position.findByPk(positionId);

    if (!position) {
      throw new Error(`position with id ${positionId} is missing`);
    }

    await position.update(params, {
      fields: ['name', 'departmentId']
    });

    return position.get({plain: true});
  },
  getPosition: async(positionId, {Models}) => {
    const position = await Models.Position.findByPk(positionId);

    if (!position) {
      throw new Error(`position with id ${positionId} is missing`);
    }

    return position.get({plain: true});
  },
  searchPositions: async({limit, offset, where, order}, {Models}) => {
    const positions = await Models.Position.findAll({
      limit,
      offset,
      where,
      order
    });

    return positions.map((item) => item.get({plain: true}));
  },
  deletePosition: async(positionId, {Models}) => {
    const position = await Models.Position.findByPk(positionId);

    if (!position) {
      throw new Error(`position with id ${positionId} is missing`);
    }

    await position.destroy();

    return true;
  }
};