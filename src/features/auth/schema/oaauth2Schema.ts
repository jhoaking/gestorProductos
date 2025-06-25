import { z } from "zod";

const OAuthUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  avatar_url: z.string().optional(),
  provider: z.enum(["github", "linkedin"]),
  rol: z.enum(["admin", "encargado"]).default("encargado").optional(),
});

export type oauth2Types = z.infer<typeof OAuthUserSchema>;

export const validateOauth = (input: unknown): oauth2Types => {
  const result = OAuthUserSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};
