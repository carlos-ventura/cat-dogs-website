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

const dogIndexLogic = (n: number): number => {
  if (allOnesBinary(n)) {
    return 10
  } else if (n < 0) {
    return 0
  } else if (n > 100) {
    return 9
  } else if (isPrime(n)) {
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
