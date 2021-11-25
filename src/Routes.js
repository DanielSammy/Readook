import express from 'express'
import socketio  from 'socket.io'
import Banco from './bancodados/consulta'
import http from 'http'
import cors from 'cors'

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const server = http.createServer(app)
const io = new socketio.Server(server,{
 cors: {origin: '*'}
})
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/usuario/:emailUsr', async (req, res) => {
  const email = req.params.emailUsr
  const results = await Banco.consultaUsuario(email)
  res.json(results)
})

app.get('/chat/getUsersToChat/:idUsr', async(req, res) => {
  const usuario = req.params.idUsr
  const results = await Banco.selectOtherUsers(usuario) 
  res.send(results);
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

app.post('/chatMensagens/atualizaMsgNaoLida', async (req, res) => {
  const informacaoInsert = req.body[0]
  const chatCodigo = informacaoInsert.chatCodigo
  const usrDest = informacaoInsert.usrDest
  const results = await Banco.atualizaMensagemNaoLidas(chatCodigo, usrDest)
  res.send(results)
})

app.post('/chatMensagens/novaMensagem', async (req, res) => {
  const informacaoInsert = req.body[0]
  const chatCodigo = informacaoInsert.chatCodigo
  const usrRem = informacaoInsert.user._id
  const usrDes = informacaoInsert.usrDest
  const dataHora = informacaoInsert.createdAt
  const mensagem = informacaoInsert.text
  const results = await Banco.insereNovaMensagem(chatCodigo, usrRem, usrDes, dataHora, mensagem)
  res.send(results)
})

app.post('/user/cadastro', async (req, res) => {
  const informacaoInsert = req.body[0]
  const name = informacaoInsert.name
  const email = informacaoInsert.email
  const senha = informacaoInsert.senha
  const dataNasc = informacaoInsert.dataNasc
  const cpf = informacaoInsert.cpf
  const fone = informacaoInsert.fone
  const results = await Banco.addUser(name, email, senha, dataNasc, cpf, fone)
  res.send(results)
})

app.post('/user/update', async (req,res) => {
  const informacaoInsert = req.body
  const usrCodigo = informacaoInsert.usrCodigo
  const nomeCampo = informacaoInsert.nomeCampo
  const valorCampo = informacaoInsert.valorCampo
  const results = await Banco.updateUser(usrCodigo, nomeCampo, valorCampo)
  if (results.returnType === "Error") {
    res.header("ErrorMessage", JSON.stringify(results.sqlMessage))
    res.status(400)
    .send(JSON.stringify('ERROR: ' + results.sqlMessage))
    return ''
  }
  res.send(results)
})

io.on('connection',(socket) => {
  console.log('conectou')
  socket.on('chatMensagem', data => {
    console.log('Nova Mensagem Chegou', data)
    io.emit('chatMensagem', data)
    const notification = {}
    notification.message = data.message[0].text
    notification.userRem = data.message[0].user
    notification.userDest = data.userDest
    notification.chatCodigo = data.message[0].chatCodigo
    io.emit('notifyChatMensagem', notification)
  })
})

server.listen(8082, () => {
  console.log('Servidor online na porta 8082')
})