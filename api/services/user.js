'use strict';

const models = require('../../models');

class UserService {

  static async getUsers(ctx) {
    const users = await models.User.findAll();
    ctx.body = users; // deleted member details
  }

  static async createUser(ctx) {
    const id = await models.User.Create(ctx.request.body);
    ctx.body = await models.User.findOne(id); // return created member details
    ctx.body.root = 'user';
  }
}

module.exports = UserService;
