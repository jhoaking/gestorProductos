import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  OAUTH_CALLBACK_URL,
} from "@/config";
import passport, { Profile } from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { UserService } from "../service/oauth2Service";
import { validateOauth } from "../schema/oaauth2Schema";
import { Provider } from "../types/typesUser";


const userClass = new UserService();

passport.serializeUser((user: any, done) => {
  done(null, { email: user.email, Provider: user.provider });
});

passport.deserializeUser(
  async (user: { email: string; provider: string }, done) => {
    const users = await userClass.findUserById(
      user.email,
      user.provider as any
    );
    done(null, users);
  }
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID as string,
      clientSecret: GITHUB_CLIENT_SECRET as string,
      callbackURL: OAUTH_CALLBACK_URL as string,
      scope: ["user:email"],
    },
    async (
      _accessToken: string,
      _refresh_token: string,
      profile: Profile,
      done: (error: any, user?: Express.User | false) => void
    ) => {
      try {
        // creando nuestr propios datos que vienen desde ihtub para tener control y no lleguen datos malos
        const email = profile.emails?.[0]?.value ?? "";
        const username = profile.username ?? "github_user";
        const avatar_url = profile.photos?.[0]?.value ?? "";
        const provider = profile.provider ?? "github";

        const userRaw = { email, username, avatar_url, provider };

        const userExistente = await userClass.findUserById(email, provider as Provider);
        if (userExistente) {
          return done(null, userExistente);
        }

        const validateUser = validateOauth(userRaw);

        const guardarUser = await userClass.createUser(validateUser);

        done(null, guardarUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
