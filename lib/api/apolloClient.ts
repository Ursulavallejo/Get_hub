import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_CONTENT_DELIVERY_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_ENVIRONMENT}`,
});

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions,
  link: authLink.concat(httpLink),
});

export { client };
