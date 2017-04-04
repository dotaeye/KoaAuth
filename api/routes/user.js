'use strict';

const router = require('koa-router')(); // router middleware for koa
const Users = require('../services/user');

router.get('/users', Users.getUsers); // list Users
// router.get('/users/:id', Users.getUserById); // get User details
router.post('/users', Users.createUser); // add new User
// router.patch('/users/:id', Users.patchUserById); // update User details
// router.delete('/users/:id', Users.deleteUserById); // delete User

module.exports = router.middleware();
