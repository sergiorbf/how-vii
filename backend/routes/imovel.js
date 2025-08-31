const express = require('express');
const router = express.Router();
const db = require('../db');

// Cadastrar imóvel
router.post('/', async (req, res) => {
  const { codigo_imovel, descricao, id_tipo } = req.body;
  try {
    await db.query(
      'INSERT INTO imovel (codigo_imovel, descricao, id_tipo) VALUES ($1, $2, $3)',
      [codigo_imovel, descricao, id_tipo]
    );
    res.status(201).send('Imóvel cadastrado com sucesso');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Obter todos os imóveis
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT i.id, i.codigo_imovel, i.descricao, t.descricao AS tipo_imovel
      FROM imovel i
      JOIN tipo_imovel t ON i.id_tipo = t.id
      ORDER BY i.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Obter imóvel por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT i.id, i.codigo_imovel, i.descricao, t.descricao AS tipo_imovel
       FROM imovel i
       JOIN tipo_imovel t ON i.id_tipo = t.id
       WHERE i.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Imóvel não encontrado');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Atualizar imóvel
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { codigo_imovel, descricao, id_tipo } = req.body;
  try {
    await db.query(
      'UPDATE imovel SET codigo_imovel = $1, descricao = $2, id_tipo = $3 WHERE id = $4',
      [codigo_imovel, descricao, id_tipo, id]
    );
    res.send('Imóvel atualizado com sucesso');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Deletar imóvel
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM imovel WHERE id = $1', [id]);
    res.send('Imóvel removido com sucesso');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
