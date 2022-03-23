import { SchemaLink } from "@apollo/client/link/schema";

import schema from "../server/schema";

/**
 * Link to use server side call directly through schema avoiding http requests
 * More info https://www.apollographql.com/docs/react/api/link/apollo-link-schema
 */
const schemaLink = new SchemaLink({ schema });

export default schemaLink;
