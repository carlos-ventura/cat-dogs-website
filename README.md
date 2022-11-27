<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby lightweight project challenge
</h1>

**Run client**

    cd cat-dogs-website/client
    npm install
    npm start

**Open website**

Site is now running at http://localhost:8000

**Requirements before running the server locally**

1. MySQL server
    1. host = localhost
    2. user = root
    3. password = password

**Requirements running the app either locally or in Docker**

1. Port 3306 must be free

**Run server**

    cd cat-dogs-website/server
    npm install
    npm start

**Open server website**

Server is now running at http://localhost:9000

**Notes/Observations:**

1. Website started running a bit slower when getting data from graphQL + Node server
    1. Commit SHA without server - a7ea4b455f4389960ae03446ae5e0bf03ae89216)
2. Given higher priority to features than the best coding practise with TypeScript
    1. Troubles with Node + TypeScript thus the existence of "any" as type

**Docker commands**

    docker-compose up --build