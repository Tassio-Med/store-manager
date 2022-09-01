const joi = require('joi');

const schemaBoth = joi.object({
  productId: joi.number().required().messages({ 'any.required': '400|"productId" is required' }),
  quantity: joi.number().min(1).required().messages({
    'any.required': '400|"quantity" is required',
    'number.empty': '400|"quantity" is required',
    'number.min': '422|"quantity" must be greater than or equal to {#limit}',
  }),
});

module.exports = schemaBoth;