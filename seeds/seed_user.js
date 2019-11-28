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
        },
        {
          id: 2,
          roleId: 3,
          email: "asep@ranggarifqi.com",
          password: bcrypt.hashSync("asep123", salt),
          fullName: "Asep"
        },
        {
          id: 3,
          roleId: 3,
          email: "deden@ranggarifqi.com",
          password: bcrypt.hashSync("deden123", salt),
          fullName: "Deden"
        },
      ]);
    });
};
