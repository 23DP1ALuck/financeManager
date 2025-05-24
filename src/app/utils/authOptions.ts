import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? ""
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? ""
        }),
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login"
    }
};