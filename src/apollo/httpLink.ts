import { HttpLink } from "@apollo/client";

/**
 * Link for data fetching in browser environment through http requests
 */
const httpLink = new HttpLink({
  uri: "/api",
});

export default httpLink;
