import express from 'express'
import Banco from './bancodados/consulta'
import socketio from 'socket.io'
import http from 'http'

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
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

app.post('/chatMensagens/novaMensagem', async (req, res) => {
  console.log(req.body)
  const informacaoInsert = req.body[0]
  const chatCodigo = informacaoInsert.chatCodigo
  const usrRem = informacaoInsert.user._id
  const usrDes = informacaoInsert.usrDest
  const dataHora = informacaoInsert.createdAt
  const mensagem = informacaoInsert.text
  const results = await Banco.insereNovaMensagem(chatCodigo, usrRem, usrDes, dataHora, mensagem)
  res.send(results)
})

io.on('connection',(socket) => {
  console.log('conectou')
  socket.on('chatMensagem', data => {
    console.log('Nova Mensagem Chegou', data)
    io.emit('chatMensagem', data)
  })
})

server.listen(8082, () => {
  console.log('Servidor online na porta 8082')
})