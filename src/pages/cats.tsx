import * as React from 'react'
import { Link } from 'gatsby'
import { useState } from 'react'

const CatPage = (): JSX.Element => {
  const [catFacts, setCatFacts] = useState<string []>([])


  return (
    <main>
      <h1>Cats page</h1>
      <Link to="/">Back to Home</Link>
      <br/><br/>
    </main>
  )
}

export const Head = (): JSX.Element => <title>Cats Page</title>

export default CatPage
