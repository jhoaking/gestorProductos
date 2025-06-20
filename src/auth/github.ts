import express from "express";
import passport from "passport";
import session from "express-session";
import "../auth/strategy/passport";

const app = express();

app.use(
  session({
    secret: "some secret",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

