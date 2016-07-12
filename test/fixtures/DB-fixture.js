const Sequelize = require('sequelize');
const sequelize = new Sequelize('testing', 'username', 'password');

const User = sequelize.define('user', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

sequelize.sync().then(() =>
  User.create({
    username: 'Brendan',
    password: 'hihi',
  }).then((Brendan) => {
  console.log(Brendan.get({
    plain: true,
  }));
});
