import { AuthService } from "@/features/auth/service/authService";
import {
  validateRegister,
  validateLogin,
} from "@/features/auth/schema/jwtSchema";
import { CookieOptions } from "express";

const authService = new AuthService();

export const resolvers = {
  Mutation: {
    register: async (_root: any, args: any) => {
      const vali = validateRegister(args.input);
      try {
        const user = await authService.registerUser(vali);
        return {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          password: user.password,
          rol: user.rol ?? null,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    login: async (_root: any, args: any, context: any) => {
      const { res } = context;
      const vali = validateLogin(args.input);
      const result = await authService.login(vali.email, vali.password);
      const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      };
      res.cookie("access_token", result.token, options);

      return {
        token: result.token,
        user: result.user,
      };
    },
    logout: async (_root: any, _args: any, context: any) => {
      const { res } = context;

      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return "Sesión cerrada exitosamente.";
    },
  },
  Query: {
    protectedUser: (_root: any, _args: any, context: any) => {
      console.log("usuario:", context.user);
      if (!context.user) {
        throw new Error("no autorizado");
      }
      return `Hola, ${context.user.username}`;
    },
  },
};
