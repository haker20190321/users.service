const Models = require('../db/models/index');
const faker = require('faker');

const run = async() => {
  await Models.User.truncate({cascade: true, force: true});

  try {
    for (let i = 0; i < 1000; i++) {
      const users = [];

      for (let j = 0; j < 1000; j++) {
        users.push({
          id: i * 1000 + j + 1,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          middleName: faker.name.suffix(),
          positionId: 4,
          isActive: true
        });
      }

      await Models.User.bulkCreate(users);
    }
  } catch(error) {
    console.warn(error.message);
  } finally {
    await Models.sequelize.close();
  }
};

run();