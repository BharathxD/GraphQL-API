import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { Express } from "express";
import { resolvers } from "./resolvers";
import logger from "../../utils/logger.util";
import Context from "../../types/context.types";
import JwtService from "../../utils/jwt.util";
import context from "./context";

const apolloServer = async (app: Express): Promise<void> => {
  try {
    const schema = await buildSchema({
      resolvers,
      // TODO: Add authChecker here if needed
    });

    const server = new ApolloServer({
      schema,
      context,
      plugins: [
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
    });

    await server.start();
    server.applyMiddleware({ app });

    logger.info("Apollo Server started successfully ✅");
  } catch (error) {
    logger.error(`Failed to start Apollo Server ❌: ${error}`);
    process.exit(1);
  }
};

export default apolloServer;
