const express = require('express');
const router = express.Router();
const db = require('../db');

// Consulta com estrutura análoga
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        p.id AS id_venda,
        p.data_pagamento,
        p.valor_pagamento,
        i.codigo_imovel,
        i.descricao AS descricao_imovel,
        t.descricao AS tipo_imovel
      FROM pagamento p
      JOIN imovel i ON p.id_imovel = i.id
      JOIN tipo_imovel t ON i.id_tipo = t.id
      ORDER BY p.data_pagamento;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
