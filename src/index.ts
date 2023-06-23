import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants"; // determine if in production or development
import microConfig from "./mikro-orm.config";
import express from "express"; // allows to build web servers and handle http requests
import { ApolloServer } from "apollo-server-express"; // allows to build graphql servers
import { HelloResolver } from "./resolvers/hello";
import { buildSchema } from "type-graphql"; // allows to build graphql schemas for resolvers and decorators
import { JobResolver } from "./resolvers/job";
import { UserResolver } from "./resolvers/user";
import * as redis from 'redis';; // allows to use redis, to connect to redis server
import session from "express-session";
import connectRedis from "connect-redis";

const main = async () => {
  
  const orm = await MikroORM.init(microConfig); // initialize mikroorm

  // Run migrations
  await orm.getMigrator().up(); // run database migrations and apply any pending migrations

  const RedisStore = require("connect-redis").default;
  let redisClient = redis.createClient();

  const app = express();

  app.use( // middleware configuration
    session({
      name: 'miwi',
      store: new RedisStore({ 
        client: redisClient as any,
        disableTouch: true, // disable session expiration
      }), // store session in redis
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years 
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https. this option can mess up local dev
      },
      saveUninitialized: false,
      secret: "sopra saves you from corporate life",
      resave: false,
    })
  )
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, JobResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res })
  });

  await apolloServer.start();
  
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server is up and running baby");
  });
};

main().catch((err) => { console.error(err) });