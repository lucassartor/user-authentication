//Config do Db para o sequelize
require('dotenv/config');

module.exports = {
    dialect: 'postgres',
    host: 'tuffi.db.elephantsql.com',
    username: 'rsphbyjd',
    password: 'qoyqtWK2oUo6ubLSS7-boOjN-tjJGF3m',
    database: 'rsphbyjd',
    define:{
        timestamps: true,
        underscored: true
    },
};