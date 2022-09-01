const salesModel = require('../models/salesModel');
const bothModel = require('../models/bothModel');

const getById = async (id) => {
  const idProduct = await salesModel.getById(id);

  if (idProduct.length === 0) {
    return {
      code: 404, message: 'Sale not found',
    };
  }
  return idProduct;
};

const getAll = async () => {
  const allSales = salesModel.getAll();
  return allSales;
};

const exclude = async (id) => {
  const delSale = await salesModel.getById(id);

  if (delSale.length === 0) {
    return {
      code: 404, message: 'Sale not found',
    };
  }
  await bothModel.exclude(id);
  await salesModel.exclude(id);
  return true;
};

module.exports = { getAll, getById, exclude };