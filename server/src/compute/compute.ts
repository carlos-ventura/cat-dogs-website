/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv')
dotenv.config()

let cycle = false

const randomIntFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)

const isPrime = (n: number): boolean => {
  for (let i = 2; i < n; i++) { if (n % i === 0) return false }
  return n > 1
}

const allOnesBinary = (n: number): boolean => {
  const binary = n.toString(2).replace('-', '')
  return binary.length >= 4 && !binary.includes('0')
}

async function checkStoreProcedure (n: number, connection: any): Promise<void> {
  const sql = 'CALL doglogic.dogIndexLogic(?)'
  return await new Promise((resolve, reject) => {
    connection.query(sql, n, function (error, results) {
      if (error !== null) reject(error)
      resolve(results[0][0].indexNumber)
    })
  })
}

const dogIndexLogic = async (n: number, connection: any): Promise<number | null> => {
  if (allOnesBinary(n)) {
    return 10
  }
  try {
    const databaseValue = await checkStoreProcedure(n, connection)
    if (databaseValue !== null) {
      return Number(databaseValue)
    }
  } catch (e) {
    console.log(e)
    console.log('Database connection error')
    return null
  }
  if (isPrime(n)) {
    return randomIntFromInterval(1, 3)
  } else if (n % 5 === 0) {
    cycle = !cycle
    if (cycle) {
      return 5
    } else {
      return 4
    }
  } else {
    return Number(process.env.STATIC_DOG)
  }
}

module.exports = { dogIndexLogic }
