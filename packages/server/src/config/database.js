//Config do Db para o sequelize
module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'Dooneyx15',
    database: 'user-auth',
    define:{
        timestamps: true,
        underscored: true
    },
};