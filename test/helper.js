const randomstring = require('randomstring');

module.exports.makeUser = () => {
  const login = randomstring.generate(12);
  return {
    login,
    password: login,
    email: `${login}@email.test`,
    first_name: `${login}_fn`,
    last_name: `${login}_ln`,
    middle_name: `${login}_pn`,
    birthday: new Date().toISOString()
  };
};

module.exports.sleep = (ms = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};