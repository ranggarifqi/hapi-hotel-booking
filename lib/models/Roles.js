"use strict";

const Schwifty = require("schwifty");
const Joi = require("joi");

module.exports = class ModelName extends Schwifty.Model {
  static get tableName() {
    return "Roles";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      name: Joi.string(),
      createdAt: Joi.date()
    }); // eslint-disable-line no-undef
  }
};
