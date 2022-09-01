const salesModel = require('../models/salesModel');
const bothModel = require('../models/bothModel');
const productModel = require('../models/productsModel');
const bothValidator = require('../middlewares/bothValidator');

const findProduct = async (id) => {
  if (id === '' || id === undefined) {
    return {
      code: 400, message: '"productId" is required',
    };
  }

  const idToFind = await productModel.getById(id);
  
  if (idToFind.length === 0) {
    return {
      code: 404, message: 'Product not found',
    };
  }
  return true;
};

const errorValidator = async (productAndSale) => {
  const validErrors = await Promise
    .all(productAndSale.map(async (saleProduct) => {
    const { productId, quantity } = saleProduct;
      const validate = bothValidator
        .readyToUpdate(productId, quantity);
    const product = await findProduct(productId);
    const { code, message } = validate;

      if (product.code && product.message) return product;
      
      if (code && message) {
        return {
          code: Number(code), message,
        };
      }
    return true;
  }));
  return validErrors;
};

const create = async (productAndSale) => {
  const prodAllow = await errorValidator(productAndSale);
  const validator = prodAllow.find((validate) => Object
    .keys(validate)
    .includes('code'));
  if (validator) return validator;

  const { insertId } = await salesModel.create();

  productAndSale.forEach(async (sales) => {
    const { productId, quantity } = sales;
    await bothModel.create(insertId, productId, quantity);
  });

  return {
    id: insertId,
    itemsSold: productAndSale,
  };
};

const update = async (id, productAndSale) => {
  const saleUpdate = await salesModel.getById(id);

  if (saleUpdate.length === 0) {
    return {
      code: 404, message: 'Sale not found',
    };
  }

  const prodAllow = await errorValidator(productAndSale);
  const validator = prodAllow.find((validate) => Object
    .keys(validate).includes('code'));
  
  if (validator) return validator;

  productAndSale.forEach(async (sales) => {
    const { productId, quantity } = sales;
    await bothModel.update(id, productId, quantity);
  });

  return {
    saleId: Number(id),
    itemsUpdated: productAndSale,
  };
};

module.exports = { create, update };