import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import jwt from "jsonwebtoken";
import resolvers from "./resolvers/index";
import entities from "./entities/index";
import authChecker from "./utils/authchecker";
import User from "./entities/user";
import express from "express";
import cors from "cors";

dotenv.config();

const main = async () => {
  const schema = await buildSchema({ resolvers, authChecker });

  const server = new ApolloServer({
    schema,
    context: async ({ req }: { req: any }) => {
      let user;
      try {
        const token = req.headers.authorization;
        const decoded: any = jwt.verify(
          token.split("Bearer ")[1],
          process.env.JWT_SECRET!
        );
        user = await User.findOne({
          where: { id: decoded },
          relations: ["permission"],
        });
      } catch (e) {
        console.log(`message ${e}`);
      }
      return { user: user };
    },
  });

  await server.start();

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:8000/graphql",
        "http://localhost:3000",
        "https://hostelaffairsiitm.com",
      ],
    })
  );

  server.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT || 8000, () =>
    console.log(`Server running: http://localhost:${process.env.PORT || 8000}`)
  );
};

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities,
  synchronize: true,
  logging: false,
})
  .then(() => {
    console.log("DATABASE CONNECTED");
    main();
  })
  .catch((e) => {
    console.log({ message: e });
  });
