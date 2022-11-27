/* eslint-disable @typescript-eslint/no-var-requires */
const mysqlCheck = require('mysql2/promise')

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
    const connectionCheck = await mysqlCheck.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password'
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
