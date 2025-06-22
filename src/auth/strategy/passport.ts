import passport, { Profile } from "passport";
import { UserService } from "../service/oauth2Service";
import { validateOauth } from "../schema/oaauth2Schema";
import { Provider } from "@/types/typesUser";

const userClass = new UserService();

passport.serializeUser((user: any, done) => {
  done(null, { email: user.email, provider: user.provider });
});

passport.deserializeUser(
  async (user: { email: string; provider: string }, done) => {
    const users = await userClass.findUserById(user.email, user.provider as Provider);
    done(null, users);
  }
);


export function setupOAuthStrategy({
  strategy,
  name,
  clientID,
  clientSecret,
  callbackURL,
}: {
  strategy: any;
  name: Provider;
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}) {
  passport.use(
    new strategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        scope: ["user:email"],
      },
      async (
        _accessToken: string,
        _refresh_token: string,
        profile: Profile,
        done: (error: any, user?: Express.User | false) => void
      ) => {
        try {
          const email = profile.emails?.[0]?.value ?? "";
          const username = profile.username ?? `${name}_user`;
          const avatar_url = profile.photos?.[0]?.value ?? "";

          const provider = name;

          const userRaw = { email, username, avatar_url, provider };

          const userExistente = await userClass.findUserById(email, provider);
          if (userExistente) return done(null, userExistente);

          const validatedUser = validateOauth(userRaw);
          const nuevoUser = await userClass.createUser(validatedUser);

          done(null, nuevoUser);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
}
