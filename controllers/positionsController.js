'use strict';

const positionsService = require('../service/positionsService');

module.exports = {
  createDepartment: async({departmentData}, ext, writeError) => {
    try {
      return await positionsService.createDepartment(departmentData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  getDepartment: async({departmentId}, ext, writeError) => {
    try {
      return await positionsService.getDepartment(departmentId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  updateDepartment: async({departmentId, departmentData}, ext, writeError) => {
    try {
      return await positionsService.updateDepartment(departmentId.value, departmentData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  searchDepartments: async({searchParams}, ext, writeError) => {
    try {
      return await positionsService.searchDepartments(searchParams.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  deleteDepartment: async({departmentId}, ext, writeError) => {
    try {
      return await positionsService.deleteDepartment(departmentId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  createPosition: async({positionData}, ext, writeError) => {
    try {
      return await positionsService.createPosition(positionData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  updatePosition: async({positionId, positionData}, ext, writeError) => {
    try {
      return await positionsService.updatePosition(positionId.value, positionData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  getPosition: async({positionId}, ext, writeError) => {
    try {
      return await positionsService.getPosition(positionId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  searchPositions: async({searchParams}, ext, writeError) => {
    try {
      return await positionsService.searchPositions(searchParams.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  deletePosition: async({positionId}, ext, writeError) => {
    try {
      return await positionsService.deletePosition(positionId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  }
};