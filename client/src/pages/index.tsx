import * as React from 'react'
import { Link } from 'gatsby'

const IndexPage = (): JSX.Element => {
  return (
    <main>
      <h1>Cats and Dogs Website</h1>
      <Link to="/cats">Cat facts</Link>
      <br/><br/>
      <Link to="/dogs">Dog pictures</Link>
    </main>
  )
}

export const Head = (): JSX.Element => <title>Index page</title>

export default IndexPage
