//Config do Db para o sequelize
require('dotenv/config');

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    define:{
        timestamps: true,
        underscored: true
    },
};