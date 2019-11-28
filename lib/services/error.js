"use strict";

const Schmervice = require("schmervice");
const { ValidationError, NotFoundError } = require("objection");

const {
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} = require("objection-db-errors");

module.exports = class ErrorService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  errorHandler(err, h) {
    if (err instanceof ValidationError) {
      switch (err.type) {
        case "ModelValidation":
          return h
            .response({
              message: err.message,
              type: err.type,
              data: err.data
            })
            .code(400);
        case "RelationExpression":
          return h
            .response({
              message: err.message,
              type: "RelationExpression",
              data: {}
            })
            .code(400);
        case "UnallowedRelation":
          return h
            .response({
              message: err.message,
              type: err.type,
              data: {}
            })
            .code(400);
        case "InvalidGraph":
          return h
            .response({
              message: err.message,
              type: err.type,
              data: {}
            })
            .code(400);
        default:
          return h
            .response({
              message: err.message,
              type: "UnknownValidationError",
              data: {}
            })
            .code(400);
      }
    } else if (err instanceof NotFoundError) {
      return h
        .response({
          message: err.message,
          type: "NotFound",
          data: {}
        })
        .code(400);
    } else if (err instanceof UniqueViolationError) {
      return h
        .response({
          message: err.message,
          type: "UniqueViolation",
          data: {
            columns: err.columns,
            table: err.table,
            constraint: err.constraint
          }
        })
        .code(409);
    } else if (err instanceof NotNullViolationError) {
      return h
        .response({
          message: err.message,
          type: "NotNullViolation",
          data: {
            column: err.column,
            table: err.table
          }
        })
        .code(400);
    } else if (err instanceof ForeignKeyViolationError) {
      return h
        .response({
          message: err.message,
          type: "ForeignKeyViolation",
          data: {
            table: err.table,
            constraint: err.constraint
          }
        })
        .code(409);
    } else if (err instanceof CheckViolationError) {
      return h
        .response({
          message: err.message,
          type: "CheckViolation",
          data: {
            table: err.table,
            constraint: err.constraint
          }
        })
        .code(400);
    } else if (err instanceof DataError) {
      return h
        .response({
          message: err.message,
          type: "InvalidData",
          data: {}
        })
        .code(400);
    } else if (err instanceof DBError) {
      return h
        .response({
          message: err.message,
          type: "UnknownDatabaseError",
          data: {}
        })
        .code(500);
    } else {
      return h
        .response({
          message: err.message,
          type: "UnknownError",
          data: {}
        })
        .code(500);
    }
  }
};
