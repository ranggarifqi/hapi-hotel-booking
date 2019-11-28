"use strict";

const Schwifty = require("schwifty");
const Joi = require("joi");

module.exports = class Bookings extends Schwifty.Model {
  static get tableName() {
    return "bookings";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      userId: Joi.number().integer().required(),
      roomId: Joi.number().integer().required(),
      checkInAt: Joi.date().required(),
      checkOutAt: Joi.date().required(),
      createdAt: Joi.date()
    }); // eslint-disable-line no-undef
  }
};
