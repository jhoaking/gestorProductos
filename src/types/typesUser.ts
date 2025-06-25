export enum Provider {
  github = "github",
  linkedin = "linkedin",
  credentials  ="credentials"
}

enum Rol {
  admin = "admin",
  encargado = "encargado",
}

export interface UserServiceType {
  user_id: string;
  username: string;
  email: string;
  password: string;
  provider: Provider;
  avatar_url: string;
  createdAt: Date;
  rol: Rol;
}

export type AuthType = Pick<UserServiceType, "user_id" | "username" | "email" | "password" | "rol">
