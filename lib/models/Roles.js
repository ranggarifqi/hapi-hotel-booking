"use strict";

const Schwifty = require("schwifty");
const Joi = require("@hapi/joi");

module.exports = class Roles extends Schwifty.Model {
  static get tableName() {
    return "roles";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      name: Joi.string(),
      createdAt: Joi.date()
    }); // eslint-disable-line no-undef
  }
};
