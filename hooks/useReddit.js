import { useSession } from "next-auth/react";



function useReddit() {
    const { data: session } = useSession();

    if (session) {
      const redditApi = new snoowrap({
        userAgent: '/',
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        accessToken: session.user.accessToken,
        refreshToken: session.user.refreshToken,
      });

      return redditApi;
    }

    return undefined;
}

export default useReddit
