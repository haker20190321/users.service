const assert = require('chai').assert;
const {createUser} = require('../service/usersService');
const {makeUser} = require('./helper');
const {AuthSuccess} = require('./mockOAuth');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');

const Models = require('../db/models');
const settingsService = require('../service/settingsService');
const ext = {Models};

const settingsFields = ['userId', 'key', 'value'];

describe('settingsService test', function () {
  let user = {};

  it('should init', async function () {
    const userData = await makeUser();

    user = await createUser(userData, {Models, OAuth: new AuthSuccess(), logger});
  });

  it('should createUserSetting', async function () {
    const res = await settingsService.createUserSetting(user.id, 'foo', 'bar', ext);

    assert.isObject(res);
    assert.hasAllKeys(res, settingsFields);
    assert.equal(res.userId, user.id);
    assert.equal(res.key, 'foo');
    assert.equal(res.value, 'bar');
  });

  it('should setUserSettings', async function () {
    const res = await settingsService.setUserSettings(user.id, [
      {key: 'foo', value: 'baz'},
      {key: 'foo1', value: 'bar11'},
      {key: 'foo2', value: 'bar22'},
      {key: 'foo3', value: 'bar32', e: 'bobo'}
    ], ext);

    assert.isArray(res);
    assert.isNotEmpty(res);
    assert.lengthOf(res, 4);
    res.forEach(item => assert.hasAllKeys(item, settingsFields));
  });

  it('should searchUserSettings', async function () {
    const res = await settingsService.searchUserSettings({
      where: {userId: user.id}
    }, ext);

    assert.isArray(res);
    assert.isNotEmpty(res);
    assert.lengthOf(res, 4);
    res.forEach(item => assert.hasAllKeys(item, settingsFields));
  });

  it('should deleteUserSetting', async function () {
    const res = await settingsService.deleteUserSetting(user.id, 'foo', ext);

    assert.isObject(res);
    assert.hasAllKeys(res, settingsFields);
    assert.equal(res.userId, user.id);
    assert.equal(res.key, 'foo');
  });

  it('should deleteUserSetting after delete', async function () {
    try {
      const res = await settingsService.deleteUserSetting(user.id, 'foo', ext);
      assert.isUndefined(res);
    } catch (e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `setting with userId = ${user.id}, key = foo is not exist`);
    }
  });
});