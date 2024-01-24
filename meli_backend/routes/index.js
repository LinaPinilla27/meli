const express = require('express');
const { serializeData, serializeDataById } = require('../serialize');

const router = express.Router();

const validateQueryParameter = (req, res, next) => {
  if (!req.query.q) {
    return res.status(400).json({ error: 'El parámetro "q" es obligatorio.' });
  }
  next();
};

const validateIdParameter = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'El parámetro "id" es obligatorio.' });
  }
  next();
};

router.get('/', validateQueryParameter, async (req, res) => {
  try {
    const serializedData = await serializeData(req.query.q);
    res.json(serializedData);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

router.get('/:id', validateIdParameter, async (req, res) => {
  try {
    const serializedDataById = await serializeDataById(req.params.id);
    res.json(serializedDataById);
  } catch (error) {
    res.status(500).json({ error: `Error interno del servidor: ${error.message}` });
  }
});

module.exports = router;