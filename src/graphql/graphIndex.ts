import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config";
import { AuthType } from "@/types/typesUser";
import { Express } from "express"; 
import cookieParser from "cookie-parser";

export async function start(app: Express) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  
  app.use(
    "/graphql",
    cookieParser(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.cookies?.access_token;
        console.log(token)
 
        let user;

        if (token) {
          try {
            user = jwt.verify(token, JWT_SECRET) as AuthType;
          } catch {}
        }
        console.log("usuario:", user);
        return { user, res };
      },
    })
  );
}
