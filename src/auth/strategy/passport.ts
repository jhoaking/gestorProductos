import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  OAUTH_CALLBACK_URL,
} from "@/config";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";

passport.serializeUser((user, done) => {
  done(null, user.provider);
});

passport.deserializeUser(async (id, done) => {
  done(null, id);
});

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: OAUTH_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refresh_token, profile, done) => {}
  )
);
