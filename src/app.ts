import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import { authRouter } from "./routes/auth.routes";
import { routerDashboard } from "./routes/dashbard.routes";

import "./features/auth/strategy/passport";
import "./features/auth/strategy/oauthInit";

export const app = express();


app.use(cors({ origin: ["http://localhost:3000","https://studio.apollographql.com"], credentials: true }));
app.use(express.json());            
app.use(cookieParser());

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
