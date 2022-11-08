const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs = require('../../config/database');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
const db = {};

let sequelize;

// Config for the database and create sequelize instance
sequelize = new Sequelize(config.database, config.username, config.password, config);
sequelize.authenticate().then(() => {
    console.log(`${env.toUpperCase()} :: Connection has been established successfully to the database.`);
}).catch((err) => {
    console.log("Unable to connect to the database:");
    console.log(err)
});

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// make sequelize global
global.sequelize = sequelize;

module.exports = db;