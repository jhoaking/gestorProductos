import jwt from "jsonwebtoken";
import { AuthType } from "@/types/typesUser";
import { JWT_SECRET } from "@/config";
import { Request, Response, NextFunction } from "express";

interface AutenticateRequest extends Request {
  user?: AuthType;
}

export const isAutorized = (
  req: AutenticateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res
        .status(401)
        .json({ message: "no autorizado : token no proporcionado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as AuthType;
    req.user = decoded;

    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
