'use strict';

const models = require('../../models');

class UserService {

  static getUsers(ctx) {
    // const users = await models.User.findAll();
    // ctx.body = users; // deleted member details
    // ctx.body.root = 'User';
    ctx.body='async';
  }

  static async createUser(ctx) {
    const id = await models.User.Create(ctx.request.body);
    ctx.body = await models.User.findOne(id); // return created member details
    ctx.body.root = 'User';
  }
}

module.exports = UserService;
