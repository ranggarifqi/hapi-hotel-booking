"use strict";

const Schwifty = require("schwifty");
const Joi = require("@hapi/joi");

module.exports = class Users extends Schwifty.Model {
  static get tableName() {
    return "Users";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      email: Joi.string().email(),
      password: Joi.string(),
      fullName: Joi.string()
    }); // eslint-disable-line no-undef
  }
};
