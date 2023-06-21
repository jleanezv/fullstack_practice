import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Job } from "./entities/Job";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { HelloResolver } from "./resolvers/hello";
import { buildSchema } from "type-graphql";
import { JobResolver } from "./resolvers/job";

const main = async () => {
  const orm = await MikroORM.init(microConfig);

  // Run migrations
  await orm.getMigrator().up();

  const app = express();
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, JobResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em })
  });

  await apolloServer.start();
  
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server is up and running baby");
  });
};

main().catch((err) => { console.error(err) });