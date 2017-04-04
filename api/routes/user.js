'use strict';

const router = require('koa-router')(); // router middleware for koa
const Users = require('../services/user');

router.get('/user', Users.getUsers); // list Users
// router.get('/user/:id', Users.getUserById); // get User details
router.post('/user', Users.createUser); // add new User
// router.patch('/user/:id', Users.patchUserById); // update User details
// router.delete('/user/:id', Users.deleteUserById); // delete User

module.exports = router.middleware();
