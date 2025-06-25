import { AuthType } from "../typesUser";

export {};

declare global {
    namespace Express {
    interface Request {
      user?: AuthType;
    }
  }
}