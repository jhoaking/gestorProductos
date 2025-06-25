import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET, SALT_ROUNDS } from "@/config";

export class UtilClass {
  static hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, Number(SALT_ROUNDS));
    return hash;
  };

  static comparePassword = async (password : string, passwordHashed: string) => {
    const compare = await bcrypt.compare(password , passwordHashed);
    return compare;
  };

  static createToken = (user: JwtPayload): string => {
    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        rol: user.rol,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    return token;
  };
}
