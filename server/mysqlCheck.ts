/* eslint-disable @typescript-eslint/no-var-requires */
const mysqlCheck = require('mysql2')

const simpleLogicProcedure =
'CREATE procedure if not exists doglogic.dogIndexLogic(IN inputNumber int)\n' +
 'begin\n' +
 'declare indexNumber int;\n' +
 'if (inputNumber < 0 ) then set indexNumber = 0;\n' +
 'elseif (inputNumber > 100) then set indexNumber = 10;\n' +
 'end if;\n' +
 'select indexNumber;\n' +
 'end'

const connectionCheck = mysqlCheck.createConnection({
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
