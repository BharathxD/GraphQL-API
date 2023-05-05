import { ApolloServer } from "apollo-server-express";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { Express } from "express";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";

const apolloServer = async (app: Express) => {
    const schema = await buildSchema({
        resolvers,
        // authChecker
    });
    const server: ApolloServer = new ApolloServer({
        schema,
        context: (ctx) => {
            return ctx;
        },
        plugins: [
            process.env.NODE_ENV === "production" ? ApolloServerPluginLandingPageProductionDefault() : ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });
    await server.start();
    server.applyMiddleware({ app });
}

export default apolloServer;
