import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";

import typePolicies from "./typePolicies";

let apolloClient: ApolloClient<NormalizedCacheObject>;

/**
 * Using dependency injection for Apollo Link to avoid bundling server code into client and vice versa
 */
const createApolloClient = (link: ApolloLink) =>
  new ApolloClient({
    cache: new InMemoryCache({ typePolicies }),
    link,
    ssrMode: typeof window === "undefined",
  });

export const initializeApollo = (
  link: ApolloLink,
  initialState?: NormalizedCacheObject
) => {
  const _apolloClient = apolloClient ?? createApolloClient(link);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export const useApollo = (
  link: ApolloLink,
  initialState?: NormalizedCacheObject
) => useMemo(() => initializeApollo(link, initialState), [initialState, link]);
