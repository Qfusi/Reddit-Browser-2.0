import NextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit"
import { LOGIN_URL } from "../../../lib/reddit";

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
      // initial sign in
      if (account && user) {
        console.log("INITIAL SIGN IN...");
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

      // access token has expired, need to refresh it. TODO fix automatic refresh functionality
      console.log("ACCESS TOKEN HAS EXPIRED. LOG OUT AND IN TO REFRESH...");
      return token;
    }
  }
})