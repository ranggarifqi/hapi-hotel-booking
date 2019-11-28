"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  method: "POST",
  path: "/users/login",
  options: {
    tags: ['api'],
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }
    },
    handler: async (request, h) => {
      const { userService } = request.services();
      const payload = request.payload;
      return await userService.login(payload);
    }
  }
};
