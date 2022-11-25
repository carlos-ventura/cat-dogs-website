import * as React from 'react'
import { Link } from 'gatsby'
import { useState } from 'react'

const randomIntFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)

const isPrime = (n: number): boolean => {
  for (let i = 2; i < n; i++) { if (n % i === 0) return false }
  return n > 1
}

const allOnesBinary = (n: number): boolean => {
  const binary = n.toString(2)
  return binary.length >= 4 && !binary.includes('0')
}

const DogsPage = (): JSX.Element => {
  const [dogURL, setDogURL] = useState<string | null>(null)
  const [inputNumber, setInputNumber] = useState<number>()
  const [cycle, setCycle] = useState(false)

  const dogIndexLogic = (n: number): number => {
    if (n < 0) {
      return 0
    } else if (allOnesBinary(n)) {
      return 10
    } else if (n > 100) {
      return 9
    } else if (isPrime(n)) {
      return randomIntFromInterval(1, 3)
    } else if (n % 5 === 0) {
      setCycle(!cycle)
      if (cycle) {
        return 5
      } else {
        return 4
      }
    } else {
      return Number(process.env.STATIC_DOG)
    }
  }

  async function fetchDogDataGraphQL (index: number): Promise<void> {
    try {
      const response = await fetch(String(process.env.GRAPHQL_URL), {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          query: `
              query DogURL($index: Int!) {
                dogURL(index: $index)
              }
          `,
          variables: { index }
        })
      })
      const { data } = await response.json()
      setDogURL(data.dogURL)
    } catch (err) {
      alert('Server / GraphQL error')
      console.log(err)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const result = dogIndexLogic(inputNumber ?? 0)
    void fetchDogDataGraphQL(result)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputNumber(Number(e.target.value))
  }

  return (
    <main>
      <h1>Dogs page</h1>
      <Link to="/">Back to Home</Link>
      <br/>
      <form onSubmit={handleSubmit}>
        <p>Input magic number below</p>
        <input type="number" required onChange={handleChange}></input>
        <br/><br/>
        <button type="submit">Generate magic dog picture</button>
      </form>
      <br/> <br/>
      {(dogURL != null) && (
        <img
          alt="Dog image"
          src={dogURL}
          width="auto"
          height={500}
        />
      )}
    </main>
  )
}

export const Head = (): JSX.Element => <title>Dogs Page</title>

export default DogsPage
