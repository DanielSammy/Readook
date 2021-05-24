import mysql from 'mysql'
import config from './config'
import fs from 'fs'

export const connection = mysql.createConnection(config.mysql)

connection.connect( err => {
  if(err) console.alert(err)
})

export const consultaUsuario = async () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
      if(err) {
        return reject(err)
      }
      resolve(results)
    })
  })
}

export const consultaChat = async (usuarios) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM chat where cha_usuarios = '${usuarios}'`, (err, results) => {
      if (err) {
        return reject(err)
      }
      if (results.length == 0) {
        connection.query(`INSERT INTO chat (cha_usuarios) values ('${usuarios}');`, (err, results) => {
          if (err) {
            return reject(err)
          }
          connection.query(`SELECT * FROM chat where cha_usuarios = '${usuarios}'`, (err, results) => {
            resolve(results)
          });
        })
      }
      else {
        resolve(results)
      }
    })
  })
}

export const consultaChatMensagens = async (chatCodigo) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM chatmensagem where chm_chacodigo = '${chatCodigo}'`, (err, results) => {
      if(err){
        return reject(err)
      }
      resolve(results)
    })
  })
}

export const insereNovaMensagem = async (chatCodigo, usrRem, usrDes, data, hora, mensagem) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO chatmensagem ('chm_chacodigo','chm_usrcodigorem','chm_usrcodigodes', 'chm_data', 'chm_hora', 'chm_mensagem')
     values (${chatCodigo},${usrRem},${usrDes},'${data}', '${hora}', '${mensagem}' ) `, (err, results) => {
       if (err) {
         return reject(err)
       }
       resolve(results);
     })
  })
}

export default {
  consultaUsuario,
  consultaChat,
  consultaChatMensagens,
  insereNovaMensagem
}