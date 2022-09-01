const joi = require('joi');

const schemaProduct = joi.object({
  name: joi.string().min(5).required().messages({
    'any.required': '400|"name" is required',
    'string.empty': '400|"name" is required',
    'string.min': '422|"name" length must be at least {#limit} characters long',
  }),
});

module.exports = schemaProduct;