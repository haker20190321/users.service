const assert = require('chai').assert;

const Models = require('../db/models');
const settingsService = require('../service/settingsService');
const ext = {Models};

const settingsFields = ['userId', 'key', 'value'];

describe('settingsService test', function () {
  it('should setSetting', async function () {
    const res = await settingsService.createUserSetting(1, 'foo', 'bar', ext);

    assert.isObject(res);
    assert.hasAllKeys(res, settingsFields);
    assert.equal(res.userId, 1);
    assert.equal(res.key, 'foo');
    assert.equal(res.value, 'bar');
  });

  it('should setSettings', async function () {
    const res = await settingsService.setUserSettings(1, [
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
      where: {userId: 1}
    }, ext);

    assert.isArray(res);
    assert.isNotEmpty(res);
    assert.lengthOf(res, 4);
    res.forEach(item => assert.hasAllKeys(item, settingsFields));
  });

  it('should deleteUserSetting', async function () {
    const res = await settingsService.deleteUserSetting(1, 'foo', ext);

    assert.isObject(res);
    assert.hasAllKeys(res, settingsFields);
    assert.equal(res.userId, 1);
    assert.equal(res.key, 'foo');
  });

  it('should deleteUserSetting after delete', async function () {
    try {
      const res = await settingsService.deleteUserSetting(1, 'foo', ext);
      assert.isUndefined(res);
    } catch (e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, `setting with userId = 1, key = foo is not exist`);
    }
  });
});