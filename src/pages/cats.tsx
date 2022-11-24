import * as React from 'react'
import { Link } from 'gatsby'
import { useState } from 'react'

const CatPage = (): JSX.Element => {
  const [catFacts, setCatFacts] = useState<string []>([])

  async function fetchData (): Promise<void> {
    const url = 'https://catfact.ninja/fact'
    const response = await fetch(url)
    const fact = await response.json()
    setCatFacts((prevCatFacts) => ([...prevCatFacts, fact.fact]))
  }

  return (
    <main>
      <h1>Cats page</h1>
      <Link to="/">Back to Home</Link>
      <br/><br/>
      <button onClick={() => { void fetchData() }}>Generate new fact</button>
      {catFacts.map((fact, index) => <p key={`fact-${index}`}>{index}. {fact}</p>)}
    </main>
  )
}

export const Head = (): JSX.Element => <title>Cats Page</title>

export default CatPage
