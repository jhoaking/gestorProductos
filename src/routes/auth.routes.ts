import { Router } from "express";
import passport from "passport";

export const authRouter = Router();

authRouter.get("/github", passport.authenticate("github"));

authRouter.get(
  "/redirect",
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/github",
  })
);

authRouter.get("/linkedin", passport.authenticate("linkedin"));

authRouter.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/dashboard",
    failureRedirect: "/linkedin",
  })
);
