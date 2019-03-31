import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";

const GRAPHQL_ENDPOINT =
  "https://badminton-stat-tracker.herokuapp.com/v1alpha1/graphql";

const createApolloClient = token => {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
