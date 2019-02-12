const randomstring = require('randomstring');
const positionsService = require('../service/positionsService');
const Models = require('../db/models');

module.exports.makeUser =  async () => {
  const login = randomstring.generate(12);
  const position = await getTestPosition();

  return {
    login,
    password: login,
    email: `${login}@email.test`,
    firstName: `${login}_fn`,
    lastName: `${login}_ln`,
    middleName: `${login}_pn`,
    birthday: new Date().toISOString(),
    positionId: position.id
  };
};

module.exports.sleep = (ms = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const getTestPosition = async () => {
  let position;
  const positions = await positionsService.searchPositions({
    limit: 1,
  }, {Models});

  if (positions.length) {
    position = positions[0];
  } else {
    const department = await positionsService.createDepartment({name: 'test department'}, {Models});
    position = await positionsService.createPosition({
      name: 'test position',
      departmentId: department.id
    }, {Models});
  }

  return position;
};