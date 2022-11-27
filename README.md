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

**Requirements before running the server**

1. MySQL server
    1. host = localhost
    2. user = root
    3. password = password

**Run server**

    cd cat-dogs-website/server
    npm install
    npm start

**Open server website**

Server is now running at http://localhost:9000

**Docker commands**

    cd cat-dogs-website/client
    docker build -f Dockerfile -t client .
    docker run -it -p 8000:8000 client 

    cd cat-dogs-website/server
    docker build -f Dockerfile -t server .
    docker run -it -p 9000:9000 server

    OR

    docker-compose up --build
