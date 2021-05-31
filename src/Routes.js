import express from 'express'
import bodyParser from 'body-parser'
import Banco from './bancodados/consulta'
import socketio from 'socket.io'
import http from 'http'

const app = express();
const server = http.createServer(app)
const io = new socketio.Server(server);

app.get('/usuario/:emailUsr', async (req, res) => {
  const email = req.params.emailUsr
  const results = await Banco.consultaUsuario(email);
  res.json(results)
})

app.get('/chat/:idUsr', async(req, res) => {
  const usuario = req.params.idUsr
  const results = await Banco.consultaChat(usuario)
  res.send(results)
})

app.get('/chatUsuarios/:idRem/:idDest', async (req, res) => {
  const remetente = req.params.idRem
  const destinatario = req.params.idDest
  const arrayUsuarios = [remetente,destinatario]
  const results = await Banco.consultaChatEntreUsuarios(arrayUsuarios.sort())
  res.send(results)
})

app.get('/chatMensagens/:idChat', async (req, res) => {
  const chatCodigo = req.params.idChat
  const results = await Banco.consultaChatMensagens(chatCodigo)
  res.send(results)
})

app.post('/chatMensagens/newMessage'), async (req, res) => {
  console.log(req.json)
}

io.on('connection',(socket) => {
  console.log(socket.id)
})

server.listen(8082, () => {
  console.log('Servidor online na porta 8082')
})