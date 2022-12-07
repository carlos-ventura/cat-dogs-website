import * as mysql2 from 'mysql2'

export const connection = mysql2.createConnection({
  host: String(process.env.HOST),
  user: String(process.env.USER),
  password: String(process.env.PASSWORD),
  database: String(process.env.DATABASE)
})

connection.connect(function (err) {
  if (err !== null) {
    return console.error(err.message)
  }
  console.log('Connected to the MySQL server.')
})
