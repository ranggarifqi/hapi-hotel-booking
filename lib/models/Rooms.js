"use strict";

const Schwifty = require("schwifty");
const Joi = require("joi");

module.exports = class Rooms extends Schwifty.Model {
  static get tableName() {
    return "rooms";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      type: Joi.string(),
      description: Joi.string(),
      image: Joi.string(),
      price: Joi.number(),
      createdAt: Joi.date()
    }); // eslint-disable-line no-undef
  }
};