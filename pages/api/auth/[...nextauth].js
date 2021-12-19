import NextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit"
import { LOGIN_URL } from "../../../lib/reddit";


// async function refreshAccessToken(token) {
//   try {
//     const redditApi = useReddit();

//     const test = await redditApi.updateAccessToken();
//     console.log("REFRESHED TOKEN IS: " + test);

//     return {
//       ...token,
//       accessToken: refreshedToken,
//       accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
//       refreshToken: refreshedToken.refresh_token ?? token.refresh_token,
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

export default NextAuth({
  providers: [
    RedditProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token}) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
    async jwt({ token, account, user }){

      // console.log("user");
      // console.log(user);

      // console.log("account");
      // console.log(account);

      // console.log("token");
      // console.log(token);

      // initial sign in
      if (account && user) {
        console.log("ACCESS TOKEN IS VALID...");
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000 // Expiration time is handled in milliseconds
        }
      }

      // return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) { //TODO temp /1000
        console.log("ACCESS TOKEN IS VALID...");
        return token;
      }

      // access token has expired, need to refresh it
      console.log("ACCESS TOKEN HAS EXPIRED. TRYING TO REFRESH ON NEXT API REQUEST...");
      return token;
    }
  }
})