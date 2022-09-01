const salesService = require('../services/salesService');

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const salServ = await salesService.getById(id);
    const { code, message } = salServ;
    if (code && message) { return res.status(code).json({ message }); }
    res.status(200).json(salServ);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const salServ = await salesService.getAll();
    res.status(200).json(salServ);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const salServ = await salesService.exclude(id);
    const { code, message } = salServ;
    if (code && message) { return res.status(code).json({ message }); }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getById, exclude };