"use strict";

const Dotenv = require("dotenv");
const Confidence = require("confidence");
const Toys = require("toys");

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
  server: {
    host: "localhost",
    port: {
      $env: "PORT",
      $coerce: "number",
      $default: 3000
    },
    debug: {
      $filter: { $env: "NODE_ENV" },
      $default: {
        log: ["error"],
        request: ["error"]
      },
      production: {
        request: ["implementation"]
      }
    },
    routes: {
      cors: true
    }
  },
  register: {
    plugins: [
      {
        plugin: "../lib", // Main plugin
        options: {
          jwtKey: {
            $filter: { $env: "NODE_ENV" },
            $default: {
              $env: "JWT_SECRET",
              $default: "jwt-secret"
            },
            production: {
              $env: "JWT_SECRET"
            }
          }
        }
      },
      {
        plugin: "./plugins/swagger"
      },
      {
        plugin: "schwifty",
        options: {
          $filter: "NODE_ENV",
          $default: {},
          $base: {
            migrateOnStart: true,
            knex: {
              client: "mysql",
              connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
              }
            }
          },
          production: {
            migrateOnStart: false
          }
        }
      },
      {
        plugin: {
          $filter: { $env: "NODE_ENV" },
          $default: "hpal-debug",
          production: Toys.noop
        }
      }
    ]
  }
});
