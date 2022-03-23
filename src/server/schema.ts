import { makeExecutableSchema } from "@graphql-tools/schema";

import typeDefs from "../schema.graphql";

import resolvers from "./resolvers";

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export default schema;
