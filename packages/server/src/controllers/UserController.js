const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
    async index(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const users = await User.findAll();

        return res.json(users);
    },

    async store(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const {name, email, password} = req.body;

        await User.findAll({where: {email: email}})
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: "Email already exists"
                    });
                } else {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                            const user = User.create({
                                name: name,
                                email: email,
                                password: hash
                            })
                                .then(result => {
                                    console.log(result);
                                    res.status(201).json({
                                        user: user,
                                        message: "User Created"
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    })
                                })
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },

    async login(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token');


        await User.findAll({where: {email: req.body.email}})
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                } else {
                    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                        if (err) {
                            return res.status(401).json({
                                message: "Auth failed"
                            });
                        } else if (result) {
                            const token = jwt.sign({
                                id: user[0].id,
                                email: user[0].email,
                            }, "secret", {expiresIn: "1h"});
                            //TODO: Transformar essa chave (secret) em um .ENV

                            return res.status(200).json({
                                status: 200,
                                message: "Auth successful",
                                token: token
                            })
                        }
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },

    async delete(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        await User.findAll({where: {id: req.params.id}})
            .then(user => {
                if (user.length >= 1) {
                    User.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                message: 'User Deleted'
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })
                        })

                } else {
                    return res.status(404).json({
                        message: "User does not exists"
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    }
};