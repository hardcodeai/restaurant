import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Update the URL if your server is running on a different port
  cache: new InMemoryCache(),
});

export default client;
