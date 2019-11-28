"use strict";

const Schwifty = require("schwifty");
const Joi = require("@hapi/joi");

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

  static get relationMappings() {
    const Users = require("./Users");
    const Bookings = require("./Bookings");
    return {
      bookedBy: {
        relation: Schwifty.Model.ManyToManyRelation,
        modelClass: Users,
        join: {
          from: "rooms.id",
          through: {
            modelClass: Bookings,
            from: "bookings.roomId",
            to: "bookings.userId"
          },
          to: "users.id"
        }
      }
    };
  }
};
