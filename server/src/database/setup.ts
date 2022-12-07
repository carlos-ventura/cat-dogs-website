import * as mysql2Promise from 'mysql2/promise'
import * as mysql2 from 'mysql2'
import * as dotenv from 'dotenv'
import { simpleLogicProcedure } from './logicStoreProcedure'
dotenv.config()

async function setup (): Promise<void> {
  try {
    // wait for database setup
    if (String(process.env.DOCKER) === 'true') {
      console.log('Waiting for database setup in Docker...')
      await new Promise(resolve => setTimeout(resolve, 30000))
    }
    // importing mysql2/promise: if there is no exception programs hangs
    // importing mysql2: if exception is thrown, can't catch it
    // Solution try both. First try mysql2/promise to check for exceptions, if there is no exceptions
    // the program will hang and as such tries the mysql2
    await mysql2Promise.createConnection({
      host: String(process.env.HOST),
      user: String(process.env.USER),
      password: String(process.env.PASSWORD)
    })
      .then((
        conn: {
          end: () => void
          destroy: () => void
        }) => {
        conn.end()
        conn.destroy()
      })
      .catch((err) => {
        throw err
      })

    const connectionCheck = mysql2.createConnection({
      host: String(process.env.HOST),
      user: String(process.env.USER),
      password: String(process.env.PASSWORD)
    })

    connectionCheck.connect(function (err) {
      if (err !== null) throw err
      console.log('Connected!')
      connectionCheck.query('CREATE DATABASE IF NOT EXISTS doglogic', function (err) {
        if (err !== null) throw err
        console.log('Database created / found')
      })
      connectionCheck.query(simpleLogicProcedure, function (err) {
        if (err !== null) throw err
        console.log('Procedure created / found')
      })
      connectionCheck.end()
    })
  } catch (e) {
    console.log(e)
    console.log('Problem with Database connection')
  }
}

void setup()
