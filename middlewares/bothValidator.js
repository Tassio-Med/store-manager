const bothValidator = require('../schemas/bothValidator');

const productValidator = (both) => {
  const validationOK = bothValidator.validate(both);
  return validationOK;
};

const readyToUpdate = (productId, quantity) => {
  const bothValid = { productId, quantity };
  const valid = productValidator(bothValid);
  const { error } = valid;
  
  if (error) {
    const [code, message] = error
      .message.split('|');
    return { code, message };
  }
  return valid.value;
};

module.exports = { readyToUpdate };