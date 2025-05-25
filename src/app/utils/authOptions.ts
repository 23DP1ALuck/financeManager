import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {NextAuthOptions, type User} from "next-auth";
import { type Account } from "next-auth";
import { type Session} from "next-auth";
import {prisma} from "./db"
import {JWT} from "next-auth/jwt";

export const authOptions : NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? ""
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(
                credentials: Record<"email" | "username" | "password", string> | undefined
            ): Promise<User | null> {
                if (!credentials) {
                    return null;
                }

                const {email, username, password} = credentials;

                if (!password || (!email && !username)) {
                    throw new Error("Missing required fields");
                }
                // check user. can be both username and email first
                const user = await prisma.users.findFirst({
                    where: {
                        OR: [
                            {email: email},
                            {username: username}
                        ]
                    }
                });

                if (!user || !await bcrypt.compare(password, user.password)) {
                    throw new Error("Invalid credentials");
                }
                return {
                    id: String(user.user_id),
                    name: user.username ?? undefined,
                    email: user.email ?? undefined,
                } as User;
            }
        })

    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.provider = account.provider;
                // if account provider is not credentials, find first match in db
                if (account.provider !== "credentials") {
                    const existingUser = await prisma.users.findFirst({
                        where: {
                            email: token.email ?? undefined,
                        },
                    });
                    // if no esisting user create new user in db
                    if (!existingUser) {
                        await prisma.users.create({
                            data: {
                                email: token.email!,
                                username: token.name ?? "Unnamed",
                                password: "oauthPas",
                                date_of_birth: new Date(),
                            }
                        });
                    }
                } else {
                    token.credentials = true;
                }
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login"
    }
};