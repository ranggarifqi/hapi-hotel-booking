"use strict";

const Joi = require('@hapi/joi');

module.exports = {
  method: "POST",
  path: "/users",
  options: {
    tags: ['api'],
    validate: {
      payload: {
        roleId: Joi.number().integer().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        fullName: Joi.string().required()
      }
    },
    handler: async (request, h) => {
      const { userService } = request.services();
      const newUser = request.payload;
      return await userService.register(newUser);
    }
  }
};
