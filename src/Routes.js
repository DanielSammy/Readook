import express from 'express'
import bodyParser from 'body-parser'
import Banco from './bancodados/consulta'

const app = express();

app.get('/usuarios', async (req, res) => {
  const results = await Banco.consultaUsuario();
  res.json(results)
})

app.listen(8082, () => {
  console.log('Servidor online na porta 8082')
})