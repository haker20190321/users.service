const assert = require('chai').assert;
const contactsService = require('../service/contactsService');
const Models = require('../db/models');
const {createUser} = require('../service/usersService');
const faker = require('faker');
const {makeUser} = require('./helper');
const {AuthSuccess} = require('./mockOAuth');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');

const contactFields = [
  'id',
  'userId',
  'type',
  'value'
];

describe('contactsService test', function () {

  let user = {};
  let contact = {};

  it('should init', async function () {
    const userData = await makeUser();

    user = await createUser(userData, {Models, OAuth: new AuthSuccess(), logger});
  });

  it('should addUserContact', async function () {
    const params = {
      type: 'phone',
      value: faker.phone.phoneNumber()
    };
    contact = await contactsService.addUserContact(user.id, params, {Models});

    assert.isObject(contact);
    assert.hasAllKeys(contact, contactFields);
  });

  it('should getUserContact', async function () {
    const res = await contactsService.getUserContact(contact.id, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, contactFields);
    assert.equal(res.id, contact.id);
    assert.equal(res.type, contact.type);
    assert.equal(res.value, contact.value);
  });

  it('should updateUserContact', async function () {
    const params = {
      value: faker.phone.phoneNumber()
    };

    const res = await contactsService.updateUserContact(contact.id, params, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, contactFields);
    assert.equal(res.id, contact.id);
    assert.equal(res.type, contact.type);
    assert.equal(res.value, params.value);

    contact = res;
  });

  it('should deleteUserContact', async function () {
    const res = await contactsService.deleteUserContact(contact.id, {Models});

    assert.isObject(res);
    assert.hasAllKeys(res, contactFields);
    assert.equal(res.id, contact.id);
    assert.equal(res.type, contact.type);
    assert.equal(res.value, contact.value);
  });

  it('should setUserContacts', async function () {
    const userContacts = [
      {
        type: 'phone',
        value: faker.phone.phoneNumber()
      },
      {
        type: 'email',
        value: faker.internet.email()
      }
    ];

    const contacts = await contactsService.setUserContacts(user.id, userContacts, {Models});

    assert.isArray(contacts);
    assert.isNotEmpty(contacts);
    contacts.forEach((item) => {
      assert.isObject(item);
      assert.hasAllKeys(item, contactFields);
    })
  });

  it('should searchUserContacts', async function () {
    const params = {
      where: {
        userId: user.id
      },
      limit: 5
    };

    const res = await contactsService.searchUserContacts(params, {Models});

    assert.isArray(res);
    assert.isNotEmpty(res);
    res.forEach(item => {
      assert.isObject(item);
      assert.hasAllKeys(item, contactFields);
    });
    assert.isTrue(res.length <= params.limit);
  });

  it('should getUserContacts', async function () {
    const res = await contactsService.getUserContacts(user.id, {Models});

    assert.isArray(res);
    assert.isNotEmpty(res);
    res.forEach(item => {
      assert.isObject(item);
      assert.hasAllKeys(item, contactFields);
    })
  });

  it('should deleteUserContacts', async function () {
    const where = {
      userId: user.id
    };

    const res = await contactsService.deleteUserContacts({where}, {Models});

    assert.isArray(res);
    assert.isNotEmpty(res);
    res.forEach(item => {
      assert.isObject(item);
      assert.hasAllKeys(item, contactFields);
    });
  });

  it('should delete with exception', async function () {
    const where = {
      userId: user.id
    };

    try {
      const res = await contactsService.deleteUserContacts({where}, {Models});
      assert.isUndefined(res);
    } catch (e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `no records with filter ${JSON.stringify(where)}`);
    }
  });

  it('should getUserContact after delete', async function () {
    try {
      const res = await contactsService.getUserContact(contact.id, {Models});
      assert.isUndefined(res);
    } catch (e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `contacts with id ${contact.id} is not exist`)
    }
  });

  it('should updateUserContact after delete', async function () {
    try {
      const res = await contactsService.updateUserContact(contact.id, {}, {Models});
      assert.isUndefined(res);
    } catch (e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `contacts with id ${contact.id} is not exist`)
    }
  });

  it('should deleteUserContact after delete', async function () {
    try {
      const res = await contactsService.deleteUserContact(contact.id, {Models});
      assert.isUndefined(res);
    } catch (e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `contacts with id ${contact.id} is not exist`)
    }
  });
});