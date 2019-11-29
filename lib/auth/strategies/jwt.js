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
        const user = await userService.findById(decoded.id);
        user.role = user.role.name; // Untuk digunakan oleh hapi-authorization
        return {
          isValid: true,
          credentials: user,
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
