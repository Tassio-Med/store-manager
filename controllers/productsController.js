const productsService = require('../services/productsService');

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const prodServ = await productsService.getById(id);
    if (!prodServ) { return res.status(404).json({ message: 'Product not found' }); }
    res.status(200).json(prodServ);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getByName = async (req, res) => {
  try {
    const { q } = req.query;
    const prod = await productsService.getByName(q);
    const { code, message } = prod;
    if (code && message) { return res.status(Number(code)).json({ message }); }
    return res.status(200).json(prod);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAll = async (_req, res) => {
  const prod = await productsService.getAll();
  if (Object.keys(prod).includes('status')) {
    const { status, message } = prod;
    res.status(status).json({ message });
  }
  res.status(200).json(prod);
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const prodServ = await productsService.create(name);
    const { code, message } = prodServ;
    if (code && message) { return res.status(code).json({ message }); }
    return res.status(201).json(prodServ);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const prodServ = await productsService.update(id, name);
    const { code, message } = prodServ;
    if (code && message) { return res.status(Number(code)).json({ message }); }
    return res.status(200).json(prodServ);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const prodServ = await productsService.exclude(id);
    const { code, message } = prodServ;
    if (code && message) { return res.status(Number(code)).json({ message }); }
    return res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getById, getByName, getAll, create, update, exclude };