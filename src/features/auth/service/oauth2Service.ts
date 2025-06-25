import { prisma } from "@/config/client";

import { oauth2Types } from "../schema/oaauth2Schema";
import { Provider, UserServiceType } from "@/types/typesUser";

export class UserService {
  async createUser(input: oauth2Types): Promise<UserServiceType> {
    const role = await prisma.role.findFirst({
      where: { rol: input.rol || "encargado" },
    });

    if (!role) {
      throw new Error("rol no encontrado");
    }

    const guardarUser = prisma.user.create({
      data: {
        username: input.username,
        email: input.email,
        avatar_url: input.avatar_url,
        provider: input.provider,
        role: {
          connect: {
            rol_id: role.rol_id,
          },
        },
      },
    });
    return guardarUser;
  }

  async findUserById(email: string, provider: Provider) {
    console.log("datos entrada", email, provider);

    const foundUser = await prisma.user.findFirst({
      where: {
        email,
        provider 
      },
    });

    console.log("datos salida", foundUser);

    if (!foundUser) {
      throw new Error("no se encontro al user");
    }
    return foundUser;
  }

  async controlUser(email: string) {
    const user = prisma.user.findFirst({ where: { email: email } });
    return user;
  }
}
