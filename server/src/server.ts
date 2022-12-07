import { server } from './graphql/init'

void server
  .listen({ port: 9000, hostname: '0.0.0.0' })
  .then((url) => console.log(`Server running at ${url.url}`))
