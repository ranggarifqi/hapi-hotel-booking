"use strict";

module.exports = {
  method: "GET",
  path: "/test",
  options: {
    handler: async (request, h) => {
      return 'Testing';
    }
  }
};
