/* eslint-disable no-undef */
import axios from 'axios';
import NextAuth from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';
import { LOGIN_URL, REFRESH_TOKEN_URL } from '../../../lib/reddit';

async function refreshAccessToken(token) {
    // TODO Probably doesn't work entirely..
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', token.refreshToken);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: process.env.NEXT_PUBLIC_CLIENT_ID,
                password: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            },
        };

        await axios
            .post(REFRESH_TOKEN_URL, params, config)
            .then((res) => {
                token.accessToken = res.data.access_token;
                token.accessTokenExpires =
                    Date.now() + res.data.expires_in * 1000;
                return { ...token };
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        console.log('Refreshing token failed...');

        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

export default NextAuth({
    providers: [
        RedditProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        },
        async jwt({ token, account, user }) {
            // initial sign in
            if (account && user) {
                console.log('INITIAL SIGN IN...');
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000, // Expiration time is handled in milliseconds
                };
            }

            if (Date.now() < token.accessTokenExpires) {
                console.log('ACCESS TOKEN IS VALID...');
                return token;
            }

            console.log('ACCESS TOKEN HAS EXPIRED. REFRESHING...');
            return await refreshAccessToken(token);
        },
    },
});
