const Models = require('../db/models/index');
const faker = require('faker/locale/ru');

const run = async() => {
  await Models.User.truncate({cascade: true, force: true});
  await Models.Contact.truncate({cascade: true, force: true});

  try {
    for (let i = 0; i < 200; i++) {
      const users = [];
      const contacts = [];

      for (let j = 0; j < 1000; j++) {
        const id = i * 1000 + j + 1;

        users.push({
          id,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          middleName: faker.name.suffix(),
          positionId: 4,
          isActive: true
        });
        contacts.push({
          userId: id,
          type: 'phone',
          value: faker.phone.phoneNumber()
        });
        contacts.push({
          userId: id,
          type: 'email',
          value: faker.internet.email()
        })
      }

      await Models.User.bulkCreate(users);
      await Models.Contact.bulkCreate(contacts);
    }
  } catch(error) {
    console.warn(error.message);
  } finally {
    await Models.sequelize.close();
  }
};

run();