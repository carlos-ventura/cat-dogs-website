import * as React from 'react'
import { Link } from 'gatsby'
import dogURLs from '../data/DogURLs'
import { useState } from 'react'


const DogsPage = (): JSX.Element => {
  const [inputNumber, setInputNumber] = useState<number>()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
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
      {dogIndex !== undefined && (
        <img
          alt="Dog image"
          src={dogURLs[dogIndex]}
          width="auto"
          height={500}
        />
      )}
    </main>
  )
}

export const Head = (): JSX.Element => <title>Dogs Page</title>

export default DogsPage
