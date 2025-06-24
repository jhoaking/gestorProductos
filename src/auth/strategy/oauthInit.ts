import { setupOAuthStrategy } from "./passport";
import { Strategy as GithubStrategy } from "passport-github2";
//import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";


import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
//   LINKEDIN_CLIENT_ID,
//   LINKEDIN_CLIENT_SECRET,
  GITHUB_CALLBACK_URL
} from "@/config";
import { Provider } from "@/types/typesUser";


setupOAuthStrategy({
  strategy: GithubStrategy,
  name: Provider.github,
  clientID: GITHUB_CLIENT_ID as string,
  clientSecret: GITHUB_CLIENT_SECRET as string,
  callbackURL: GITHUB_CALLBACK_URL as string,
});

// setupOAuthStrategy({
//   strategy: LinkedInStrategy,
//   name: Provider.linkedin,
//   clientID: LINKEDIN_CLIENT_ID as string,
//   clientSecret: LINKEDIN_CLIENT_SECRET as string,
//   callbackURL: OAUTH_CALLBACK_URL as string,
// });
