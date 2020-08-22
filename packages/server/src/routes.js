const express = require('express');
const UserController = require('./controllers/UserController');
const checkAuth = require('./middleware/check-auth');


const routes = express.Router();


routes.post('/index', checkAuth, UserController.index);
routes.post('/users/login', UserController.login);
routes.post('/users/signup', UserController.store);
routes.delete('/users/:id/delete', UserController.delete);


module.exports = routes;