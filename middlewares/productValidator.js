const productValidator = require('../schemas/productValidator');

const validProduct = (both) => {
  const validationOK = productValidator.validate(both);
  return validationOK;
};

const readyToUpdate = (name) => {
  const prodValid = { name };
  const valid = validProduct(prodValid);
  const { error } = valid;
  if (error) {
    const [code, message] = error
      .message.split('|');
    return { code, message };
  }
  return valid.value;
};

module.exports = { readyToUpdate };