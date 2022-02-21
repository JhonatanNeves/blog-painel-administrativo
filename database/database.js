const Sequelize = require('sequelize');

const connection = new Sequelize('guiaprex', 'root', 'g36segopro', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;