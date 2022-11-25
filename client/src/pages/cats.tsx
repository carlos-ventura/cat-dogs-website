import * as React from 'react'
import { Link } from 'gatsby'
import { useState } from 'react'

const CatPage = (): JSX.Element => {
  const [catFacts, setCatFacts] = useState<string []>([])

  async function fetchCatDataGraphQL (): Promise<void> {
    try {
      const response = await fetch(String(process.env.GRAPHQL_URL), {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query {
              catFact
            }
          `
        })
      })
      const { data } = await response.json()
      setCatFacts((prevCatFacts) => ([...prevCatFacts, data.catFact]))
    } catch (err) {
      alert('Server / GraphQL error')
      console.log(err)
    }
  }

  return (
    <main>
      <h1>Cats page</h1>
      <Link to="/">Back to Home</Link>
      <br/><br/>
      <button onClick={() => { void fetchCatDataGraphQL() }}>Generate new fact</button>
      {catFacts.map((fact, index) => <p key={`fact-${index}`}>{index}. {fact}</p>)}
    </main>
  )
}

export const Head = (): JSX.Element => <title>Cats Page</title>

export default CatPage
