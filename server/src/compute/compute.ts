import * as dotenv from 'dotenv'
import { Connection } from 'mysql2'
import { allOnesBinary } from '../utils/allOnesBinary'
import { isPrime } from '../utils/isPrime'
import { randomIntFromInterval } from '../utils/randomIntFromInterval'
import { storeProcedureResult } from './storeProcedureResult'

dotenv.config()
let cycle = false

export const dogIndexLogic = async (n: number, connection: Connection): Promise<number | null> => {
  if (allOnesBinary(n)) {
    return 10
  }
  try {
    const databaseValue = await storeProcedureResult(n, connection)
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
