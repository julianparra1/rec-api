import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './schema/index.js';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
    return{ token }
  },
  
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
