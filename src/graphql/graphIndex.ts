import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export async function start() {
  const app = express();
  
   const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();


  app.use(
    "/graphql",
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
    cookieParser(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req:Request, res }) => {
        // 🔒 Aquí vas a poner la lógica de JWT o OAuth
        return { user: null };
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 GraphQL server running at http://localhost:${PORT}/graphql`
    );
  });
}
start();
