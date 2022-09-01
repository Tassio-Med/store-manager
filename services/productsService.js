const productValidator = require('../middlewares/productValidator');
const productModel = require('../models/productsModel');

const getByName = async (name) => {
  if (name === undefined || name === '') {
    const prodAll = await productModel.getAll();
    return prodAll;
  }
  const prodAll = await productModel.getByName(name);
  return prodAll;
};

const getById = async (id) => {
  const prodId = await productModel.getById(id);

  if (prodId.length === 0) return false;
  return prodId[0];
};

const getAll = async () => {
  const prodAll = await productModel.getAll();
  return prodAll;
};

const create = async (name) => {
  const prodCreate = productValidator.readyToUpdate(name);
  const { code, message } = prodCreate;

  if (code && message) {
    return { code, message };
  }
  const { insertId } = await productModel.create(name);
  return { id: insertId, name };
};

const update = async (id, name) => {
  const validateID = await productModel.getById(id);

  if (validateID.length === 0) {
    return {
      code: 404, message: 'Product not found',
    };
  }
  const validateName = productValidator.readyToUpdate(name);
  const { code, message } = validateName;

  if (code && message) {
    return { code, message };
  }
  await productModel.update(id, name);
  return { id: Number(id), name };
};

const exclude = async (id) => {
  const validateID = await productModel.getById(id);

  if (validateID.length === 0) {
    return {
      code: 404, message: 'Product not found',
    };
  }
  await productModel.exclude(id);
  return true;
};

module.exports = { getAll, getById, create, update, exclude, getByName };