"use strict";

const Schwifty = require("schwifty");
const Joi = require("joi");

const Users = require("./Users");
const Rooms = require("./Rooms");

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

  static relationMappings = {
    user: {
      relation: Schwifty.Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: "bookings.userId",
        to: "users.id"
      }
    },
    room: {
      relation: Schwifty.Model.BelongsToOneRelation,
      modelClass: Rooms,
      join: {
        from: "bookings.roomId",
        to: "rooms.id"
      }
    }
  };
};
