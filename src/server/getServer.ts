import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";

import schema from "./schema";

const server = new ApolloServer({
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  schema,
});

const serverStart = server.start();

const getServer = async () => {
  await serverStart;

  return server;
};

export default getServer;
