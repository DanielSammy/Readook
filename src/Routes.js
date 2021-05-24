import express from 'express'
import bodyParser from 'body-parser'
import Banco from './bancodados/consulta'

const app = express();

app.use(express.static('public'))

app.get('/usuarios', async (req, res) => {
  const results = await Banco.consultaUsuario();
  res.json(results)
})

app.get('/chat/:idRem/:idDest', async (req, res) => {
  const remetente = req.params.idRem
  const destinatario = req.params.idDest
  const arrayUsuarios = [remetente,destinatario]
  const results = await Banco.consultaChat(arrayUsuarios.sort())
  res.send(results)
})

app.get('/chatMensagens/:idChat', async (req, res) => {
  const chatCodigo = req.params.idChat
  const results = await Banco.consultaChatMensagens(chatCodigo)
  res.send(results)
})

app.listen(8082, () => {
  console.log('Servidor online na porta 8082')
})