const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { 
          id: 1, 
          email: "admin@ranggarifqi.com", 
          password: bcrypt.hashSync("admin123", salt),
          fullName: "Administrator",
          roleId: 1
        }
      ]);
    });
};
