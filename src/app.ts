import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";

import "./features/auth/strategy/passport";
import "./features/auth/strategy/oauthInit";

import { authRouter } from "./routes/auth.routes";
import { routerDashboard } from "./routes/dashbard.routes";

export const app = express();

app.use(cors({ origin: ["http://localhost:4000", "http://localhost:3000"], credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "some secret",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/dashboard", routerDashboard);
