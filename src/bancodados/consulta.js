import mysql from 'mysql'
import config from './config'

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

export default {
  consultaUsuario
}