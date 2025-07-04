import { prisma } from "@/config/client";
import { UtilClass } from "../utils/auth";
import { UserServiceType } from "@/types/typesUser";
import { registerUserType } from "../schema/jwtSchema";
import { JwtPayload } from "jsonwebtoken";

export class AuthService {
  async registerUser(data: registerUserType): Promise<UserServiceType> {
    console.log("data" , data);
    
    const existingUser = await prisma.user.findFirst({

      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }
    const passowrd = await UtilClass.hashPassword(data.password);

    
    const role = await prisma.role.findFirst({
      where: { rol: data.rol || "encargado" },
    });

    if (!role) {
      throw new Error("rol no encontrado");
    }

    const createUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: passowrd,
        role: {
          connect: {
            rol_id: role.rol_id,
          },
        },
        provider: "credentials",
      },
      include: {
    role: true,  
  },
    }); 
    return createUser;
  }

  async login(email: string, password: string) {
    
    const user = await prisma.user.findFirst({
      where: { email: email, provider: "credentials" },
        include: { role: true },
    });
    if (!user) {
      throw new Error("email no encontrado");
    }
    const passwordIsValid = await UtilClass.comparePassword(
      password,
      user.password
    );
    if (!passwordIsValid) {
      throw new Error("contraseña incorrecta");
    }

    const payload: JwtPayload = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      rol: user.role.rol,
    };
    const token = UtilClass.createToken(payload);
    return {
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        rol: user.role.rol,
      },
    };
  }
}
