const bothService = require('../services/bothService');

const create = async (req, res) => {
  try {
    const both = req.body;
    const validation = await bothService.create(both);
    const { code, message } = validation;

    if (code && message) { return res.status(code).json({ message }); }
    return res.status(201).json(validation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const both = req.body;
    const validation = await bothService.update(id, both);
    const { code, message } = validation;

    if (code && message) { return res.status(code).json({ message }); }
    return res.status(200).json(validation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { create, update };