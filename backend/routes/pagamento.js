const express = require('express');
const router = express.Router();
const db = require('../db');

// Cadastrar pagamento
router.post('/', async (req, res) => {
  const { data_pagamento, valor_pagamento, id_imovel } = req.body;
  try {
    await db.query(
      `INSERT INTO pagamento 
      (
        data_pagamento, 
        valor_pagamento, 
        id_imovel
      ) VALUES 
      (
        $1,
        $2,
        $3
      )`,
      [
        data_pagamento,
        valor_pagamento,
        id_imovel
      ]
    );
    res.status(201).send('Pagamento cadastrado com sucesso');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
