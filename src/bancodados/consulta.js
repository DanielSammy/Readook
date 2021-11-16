import mysql from 'mysql'
import config from './config'
import fs from 'fs'

export const connection = mysql.createConnection(config.mysql)

connection.connect( err => {
  if(err) console.error(err)
})

export const consultaUsuario = async (email) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM usuario where usr_email = ${email}`, (err, results) => {
      if(err) {
        return reject(err)
      }
      resolve(results)
    })
  })
}

export const selectOtherUsers = async (usrCodigo) => {
  return new Promise ((resolve, reject) => {
    connection.query(`SELECT * FROM usuario  WHERE usr_codigo <> ${usrCodigo}`, (err, results) => {
      if (err) {
        return 
      }
      resolve(results)
    })
  })
};

export const consultaChatEntreUsuarios = async (usuarios) => {
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

export const consultaChat = async (usuario) => {
  return new Promise((resolve, reject) => {
    connection.query(`select cha_codigo,usr_codigo,usr_nomecompleto,usr_email,usr_dtnascimento,usr_avatar,chm_usrcodigorem,chm_datahora,chm_mensagem 
    from chat join usuario on cha_usuarios regexp usr_codigo join chatmensagem on cha_codigo = chm_chacodigo 
    where chm_codigo = (select max(chm_codigo) from chatmensagem where chm_chacodigo=cha_codigo) and usr_codigo<>${usuario} and 
    (chm_usrcodigorem = ${usuario} or chm_usrcodigodes=${usuario}) order by chm_datahora desc`, (err, results) => {
      if (err) {
        return reject(err)
      }
      resolve(results)
    })
  })
}

export const consultaChatMensagens = async (chatCodigo) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM chatmensagem join usuario on chm_usrcodigorem = usr_codigo where chm_chacodigo = '${chatCodigo}' order by chm_codigo`, (err, results) => {
      if(err){
        return reject(err)
      }
      resolve(results)
    })
  })
}

const converterHoraParaLocal = (data) => {
  const novaData = new Date(data.getTime()+data.getTimezoneOffset()*60*1000)
  const diferenca = data.getTimezoneOffset() / 60
  const horas = data.getHours()
  const dia = data.getDate()
  novaData.setHours(horas - diferenca)
  if (horas >= 21 && horas <= 23) {
    novaData.setDate(dia)
  }
  return novaData
}

export const insereNovaMensagem = async (chatCodigo, usrRem, usrDes, datahora, mensagem) => {
  return new Promise((resolve, reject) => {
    const data = converterHoraParaLocal(new Date(datahora))
    const stringData = data.toISOString()
    const dataHoraCorreta = stringData.substr(0,stringData.length - 1)
    connection.query(`INSERT INTO chatmensagem (chm_chacodigo, chm_usrcodigorem, chm_usrcodigodes, chm_datahora, chm_mensagem)
     values (${chatCodigo},${usrRem},${usrDes},'${dataHoraCorreta}', '${mensagem}' ) `, (err, results) => {
       if (err) {
         return reject(err)
       }
       resolve(results);
     })
  })
}

export const addUser = async (name, email, senha, dataNasc, cpf, fone) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO usuario (usr_nomecompleto, usr_email, usr_senha, usrdtnascimento, usr_cpf, usr_fone)
     values ('${name}','${email}','${senha}','${dataNasc}', '${cpf}', '${fone}' ) `, (err, results) => {
       if (err) {
         return reject(err)
       }
       resolve(results);
     })
  })
}

export default {
  addUser,
  consultaUsuario,
  consultaChat,
  consultaChatEntreUsuarios,
  consultaChatMensagens,
  insereNovaMensagem,
  selectOtherUsers
}