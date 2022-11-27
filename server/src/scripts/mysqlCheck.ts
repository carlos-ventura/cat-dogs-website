/* eslint-disable @typescript-eslint/no-var-requires */
const mysqlCheckPromise = require('mysql2/promise')
require('dotenv').config()

const simpleLogicProcedure =
'CREATE procedure if not exists doglogic.dogIndexLogic(IN inputNumber int)\n' +
 'begin\n' +
 'declare indexNumber int;\n' +
 'if (inputNumber < 0 ) then set indexNumber = 0;\n' +
 'elseif (inputNumber > 100) then set indexNumber = 9;\n' +
 'end if;\n' +
 'select indexNumber;\n' +
 'end'

async function main (): Promise<void> {
  try {
    // wait for database setup
    if (String(process.env.DOCKER) === 'true') {
      console.log('Waiting for database setup in Docker...')
      await new Promise(resolve => setTimeout(resolve, 30000))
    }

    // importing mysql2/promise: if no exception programs hangs
    // importing mysql2: if exception thrown, can't catch it
    // Solution try mysql2/promise, if hangs change to mysql2
    let connectionCheck = await mysqlCheckPromise.createConnection({
      host: String(process.env.HOST),
      user: String(process.env.USER),
      password: String(process.env.PASSWORD)
    })
      .then((conn: { end: () => void, destroy: () => void }) => {
        conn.end()
        conn.destroy()
      })
      .catch((err: any) => { throw err })

    const mysqlCheck = require('mysql2')
    connectionCheck = await mysqlCheck.createConnection({
      host: String(process.env.HOST),
      user: String(process.env.USER),
      password: String(process.env.PASSWORD)
    })

    connectionCheck.connect(function (err: any) {
      if (err !== null) throw err
      console.log('Connected!')
      connectionCheck.query('CREATE DATABASE IF NOT EXISTS doglogic', function (err: any) {
        if (err !== null) throw err
        console.log('Database created / found')
      })
      connectionCheck.query(simpleLogicProcedure, function (err: any) {
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

void main()
