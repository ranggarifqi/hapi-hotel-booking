"use strict";

const Schwifty = require("schwifty");
const Joi = require("@hapi/joi");

module.exports = class RoomTypes extends Schwifty.Model {
  static get tableName() {
    return "room_types";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      name: Joi.string(),
      description: Joi.string(),
      image: Joi.string(),
      qty: Joi.number(),
      price: Joi.number(),
      createdAt: Joi.date()
    }); // eslint-disable-line no-undef
  }
};
