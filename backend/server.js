const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/imovel', require('./routes/imovel'));
app.use('/pagamento', require('./routes/pagamento'));
app.use('/relatorio', require('./routes/relatorio'));
app.use('/analises', require('./routes/analises'));


async function runMigrations() {
  try {
    const imovelSQL = fs.readFileSync(path.join(__dirname, 'models/imovel.sql'), 'utf-8');
    const pagamentoSQL = fs.readFileSync(path.join(__dirname, 'models/pagamento.sql'), 'utf-8');

    await db.query(imovelSQL);
    await db.query(pagamentoSQL);

    console.log('Tabelas criadas/verificadas com sucesso!');
  } catch (err) {
    console.log(err)
    console.error('Erro ao rodar migrations:', err.message);
  }
}

app.listen(3001, async () => {
  await runMigrations();
  console.log('Servidor rodando em http://localhost:3001');
});
