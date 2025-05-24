import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import {authOptions} from "@/app/utils/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};