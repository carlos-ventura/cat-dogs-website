import * as React from 'react'
import { Link } from 'gatsby'
import { useState } from 'react'

const DogsPage = (): JSX.Element => {
  const [dogURL, setDogURL] = useState<string | null>(null)
  const [inputNumber, setInputNumber] = useState<number>()

  async function fetchDogDataGraphQL (inputNumber: number): Promise<void> {
    try {
      const response = await fetch(String(process.env.GRAPHQL_URL), {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          query: `
              query DogURL($inputNumber: Int!) {
                dogURL(inputNumber: $inputNumber)
              }
          `,
          variables: { inputNumber }
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
    if (inputNumber != null) {
      void fetchDogDataGraphQL(inputNumber)
    }
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
