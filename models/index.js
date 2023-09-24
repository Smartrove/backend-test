'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const { log } = require('console');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
// console.log(11111111, config);

const db = {};
let sequelize;


if (config.use_env_variable) { // for hostings
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
    // console.log(22222222, sequelize);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
    // console.log(33333, sequelize);
}
// console.log(2222222, fs.readdirSync(__dirname)); // [ 'index.js', 'user.js' ]
// console.log('my basename dir', basename); // index.js

fs.readdirSync(__dirname)
    .filter(file => {
        // console.log(3333333, file); // return index.js and user.js
        // console.log(4444444, file.indexOf('.')); // return the index position of "." 4 and 5
        // console.log(555555, file !== basename); // return true
        // console.log("start slice from d back", file.slice(-3)); // return .js
        // console.log("final returns", (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')); // return true
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        // console.log('loop through the return true', file); // return any other model file except the inde.js which is basename
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;

    });

// console.log(4444444, db);
Object.keys(db).forEach(modelName => {
    // console.log('new data', modelName);
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

if (process.env.NODE_ENV == "development") {
    sequelize.authenticate().then((connected) => {
        console.log('Connection has been established successfully.');
        console.log();
    }).catch((error) => {
        console.error('Unable to connect to the database:', error);
        console.log();
    });
}
// console.log(4444444, db);

module.exports = db;
