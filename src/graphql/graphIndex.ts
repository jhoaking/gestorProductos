import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { JWT_SECRET } from "@/config";
import { AuthType } from "@/types/typesUser";
import jwt from "jsonwebtoken";
import { Express } from "express"; // para el tipo

export async function start(app: Express) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.cookies?.access_token;
        let user;
        if (token) {
          try {
            user = jwt.verify(token, JWT_SECRET) as AuthType;
          } catch {
            user = null;
          }
        }
        return { user, res };
      },
    })
  );
}
