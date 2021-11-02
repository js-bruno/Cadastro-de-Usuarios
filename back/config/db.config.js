const env = require('./env.js')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// console.log(db)
db.Cliente = require('../models/cliente.model')(sequelize, Sequelize);
// db.Cliente = require('../models/cliente.model.js');

module.exports = db;