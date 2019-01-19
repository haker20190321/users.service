const randomstring = require('randomstring');

module.exports.makeUser = () => {
  const login = randomstring.generate(12);
  return {
    login,
    password: login,
    email: `${login}@email.test`,
    firstName: `${login}_fn`,
    lastName: `${login}_ln`,
    middleName: `${login}_pn`,
    birthday: new Date().toISOString()
  };
};

module.exports.sleep = (ms = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};