const assert = require('chai').assert;
const contactsController = require('../controllers/contactsController');
const Models = require('../db/models');
const {createUser} = require('../service/usersService');
const faker = require('faker');
const {makeUser} = require('./helper');
const {AuthSuccess} = require('./mockOAuth');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');

const ext = {Models, logger};
const errorLog = console.warn;
const contactFields = [
  'id',
  'userId',
  'type',
  'value'
];

describe('contactsController test', function () {
  let user = {};
  let contact = {};

  describe('Normal behavior', function () {

    it('should init', async function () {
      const userData = await makeUser();

      user = await createUser(userData, {Models, OAuth: new AuthSuccess(), logger});
    });


    it('should addUserContact', async function () {
      const params = {
        userId: {
          value: user.id
        },
        contactData: {
          value: {
            type: 'phone',
            value: faker.phone.phoneNumber()
          }
        }
      };
      contact = await contactsController.addUserContact(params, ext, errorLog);

      assert.isObject(contact);
      assert.hasAllKeys(contact, contactFields);
    });

    it('should getUserContact', async function () {
      const params = {
        contactId: {
          value: contact.id
        }
      };
      const res = await contactsController.getUserContact(params, ext, errorLog);

      assert.isObject(res);
      assert.hasAllKeys(res, contactFields);
      assert.equal(res.id, contact.id);
      assert.equal(res.type, contact.type);
      assert.equal(res.value, contact.value);
    });

    it('should updateUserContact', async function () {
      const params = {
        contactId: {
          value: contact.id
        },
        contactData: {
          value: {
            value: faker.phone.phoneNumber()
          }
        }
      };

      const res = await contactsController.updateUserContact(params, ext, errorLog);

      assert.isObject(res);
      assert.hasAllKeys(res, contactFields);
      assert.equal(res.id, contact.id);
      assert.equal(res.type, contact.type);
      assert.equal(res.value, params.contactData.value.value);

      contact = res;
    });

    it('should deleteUserContact', async function () {
      const params = {
        contactId: {
          value: contact.id
        }
      };
      const res = await contactsController.deleteUserContact(params, ext, errorLog);

      assert.isObject(res);
      assert.hasAllKeys(res, contactFields);
      assert.equal(res.id, contact.id);
      assert.equal(res.type, contact.type);
      assert.equal(res.value, contact.value);
    });

    it('should setUserContacts', async function () {
      const params = {
        userId: {
          value: user.id
        },
        userContacts: {
          value: [
            {
              type: 'phone',
              value: faker.phone.phoneNumber()
            },
            {
              type: 'email',
              value: faker.internet.email()
            }
          ]
        }
      };

      const res = await contactsController.setUserContacts(params, ext, errorLog);

      assert.isArray(res);
      assert.isNotEmpty(res);
      res.forEach(item => {
        assert.isObject(item);
        assert.hasAllKeys(item, contactFields);
      });
    });

    it('should searchUserContacts', async function () {
      const searchParams = {
        value: {
          where: {
            userId: user.id
          }
        }
      };

      const res = await contactsController.searchUserContacts({searchParams}, ext, errorLog);

      assert.isArray(res);
      assert.isNotEmpty(res);
      res.forEach(item => {
        assert.isObject(item);
        assert.hasAllKeys(item, contactFields);
      })
    });

    it('should getUserContacts', async function () {
      const params = {
        userId: {
          value: user.id
        }
      };
      const res = await contactsController.getUserContacts(params, ext, errorLog);

      assert.isArray(res);
      assert.isNotEmpty(res);
      res.forEach(item => {
        assert.isObject(item);
        assert.hasAllKeys(item, contactFields);
      })
    });

    it('should deleteUserContacts', async function () {
      const searchParams = {
        value: {
          where: {
            userId: user.id,
            type: 'phone'
          }
        }
      };
      
      const res = await contactsController.deleteUserContacts({searchParams}, ext, errorLog);

      assert.isArray(res);
      assert.isNotEmpty(res);
      res.forEach(item => {
        assert.isObject(item);
        assert.hasAllKeys(item, contactFields);
      })
    });

  });

  describe('Error behavior', function () {

    it('should addUserContact', async function () {
      const contactData = {
        value: {
          userId: user.id,
          type: 'badType',
          value: faker.phone.phoneNumber()
        }
      };

      const contact = await contactsController.addUserContact({contactData}, ext, errorLog);
      assert.isUndefined(contact);
    });

    it('should getUserContact', async function () {
      const params = {
        contactId: {
          value: contact.id
        }
      };
      const res = await contactsController.getUserContact(params, ext, errorLog);
      assert.isUndefined(res);
    });

    it('should updateUserContact', async function () {
      const params = {
        contactId: {
          value: contact.id
        },
        contactData: {
          value: {
            type: 'email'
          }
        }
      };
      const res = await contactsController.updateUserContact(params, ext, errorLog);
      assert.isUndefined(res);
    });

    it('should deleteUserContact', async function () {
      const params = {
        contactId: {
          value: contact.id
        }
      };
      const res = await contactsController.deleteUserContact(params, ext, errorLog);
      assert.isUndefined(res);
    });

    it('should setUserContacts', async function () {
      const params = {
        userId: {
          value: user.id
        },
        userContacts: {
          value: [
            {
              type: 'badType',
              value: faker.phone.phoneNumber()
            },
            {
              type: 'email',
              value: faker.internet.email()
            }
          ]
        }
      };

      const res = await contactsController.setUserContacts(params, ext, errorLog);
      assert.isUndefined(res);
    });

    it('should searchUserContacts', async function () {
      const searchParams = {
        value: {
          where: {
            userId: {
              badOp: user.id
            }
          }
        }
      };

      const res = await contactsController.searchUserContacts({searchParams}, ext, errorLog);

      assert.isUndefined(res);
    });

    it('should getUserContacts', async function () {
      const params = {
        userId: {
          value: 'invalid input'
        }
      };

      const res = await contactsController.getUserContacts(params, ext, errorLog);
      assert.isUndefined(res);
    });

    it('should deleteUserContacts', async function () {
      const searchParams = {
        value: {
          where: {
            userId: user.id,
            type: 'phone',
            id: 0
          }
        }
      };

      const res = await contactsController.deleteUserContacts({searchParams}, ext, errorLog);

      assert.isUndefined(res);
    });
  });
});