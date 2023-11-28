const z = require("zod");

/**
 * Validates a request body against a zod schema. If the validation fails, the
 * request is rejected with a 400 status code and a message describing the
 * validation error.
 * @param {z.Schema} schema The schema to validate against
 */
module.exports = (schema) => async (req, res, next) => {
  const result = await schema.safeParseAsync(req.body);

  if (result.error) {
    return res.status(400).json({
      message: "Invalid request body",
      issues: result.error.issues,
    });
  }

  req.body = result.data;

  next();
};
