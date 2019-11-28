"use strict";

const Bounce = require("@hapi/bounce");
const { NotFoundError } = require("objection");

// Dokumentasi nya ada disini https://github.com/dwyl/hapi-auth-jwt2
module.exports = (server, options) => ({
  scheme: "jwt",
  options: {
    key: options.jwtKey,
    urlKey: true,
    cookieKey: false,
    tokenType: "Bearer",
    verifyOptions: { algorithms: ["HS256"] },
    validate: async (decoded, request) => {
      const { userService } = request.services();

      try {
        return {
          isValid: true,
          credentials: await userService.findById(decoded.id)
        };
      } catch (error) {
        Bounce.ignore(error, NotFoundError);
        return {
          isValid: false
        };
      }
    }
  }
});
