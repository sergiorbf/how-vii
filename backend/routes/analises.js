const express = require('express');
const router = express.Router();
const db = require('../db');

async function getDados() {
  const result = await db.query(`
    SELECT 
      p.id AS id_venda,
      p.data_pagamento,
      p.valor_pagamento,
      i.id AS id_imovel,
      i.codigo_imovel,
      i.descricao AS descricao_imovel,
      t.descricao AS tipo_imovel
    FROM pagamento p
    JOIN imovel i ON p.id_imovel = i.id
    JOIN tipo_imovel t ON i.id_tipo = t.id
    ORDER BY p.data_pagamento;
  `);
  return result.rows;
}

router.get('/total-por-imovel', async (req, res) => {
  try {
    const dados = await getDados();

    const resultado = dados.reduce((acc, row) => {
      if (!acc[row.id_imovel]) {
        acc[row.id_imovel] = 0;
      }
      acc[row.id_imovel] += parseFloat(row.valor_pagamento);
      return acc;
    }, {});

    res.json(resultado);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/total-por-mes', async (req, res) => {
  try {
    const dados = await getDados();

    const resultado = dados.reduce((acc, row) => {
      const data = new Date(row.data_pagamento);
      const chave = `${data.getMonth() + 1}/${data.getFullYear()}`;

      if (!acc[chave]) {
        acc[chave] = 0;
      }
      acc[chave] += parseFloat(row.valor_pagamento);
      return acc;
    }, {});

    res.json(resultado);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/percentual-tipo', async (req, res) => {
  try {
    const dados = await getDados();

    const contagem = dados.reduce((acc, row) => {
      if (!acc[row.tipo_imovel]) {
        acc[row.tipo_imovel] = 0;
      }
      acc[row.tipo_imovel] += 1;
      return acc;
    }, {});

    const total = Object.values(contagem).reduce((a, b) => a + b, 0);

    const resultado = {};
    for (const tipo in contagem) {
      resultado[tipo] = ((contagem[tipo] / total) * 100).toFixed(2) + '%';
    }

    res.json(resultado);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
