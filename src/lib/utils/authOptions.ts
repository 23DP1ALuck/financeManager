import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {NextAuthOptions, Session, type User} from "next-auth";
import {prisma} from "./db"

declare module "next-auth" {
    interface Session {
            user: {
                id: number;
                name?: string | null;
                email?: string | null;
                image?: string | null;
            };
        }

    interface User {
        id: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user_id?: number;
    }
}


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
                console.log(credentials);
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
                    email: user.email ?? undefined
                } as User;
            }
        })

    ],
    callbacks: {
        async jwt({token, account, user}) {
            if (account) {
                token.provider = account.provider;
                token.id = account.id;
                // if account provider is not credentials, find first match in db
                if (account.provider !== "credentials") {
                    const existingUser = await prisma.users.findFirst({
                        where: {
                            email: token.email ?? undefined,
                        },
                    });
                    // if no esisting user create new user in db
                    if (!existingUser) {
                        const newUser = await prisma.users.create({
                            data: {
                                email: token.email!,
                                username: token.name ?? "Unnamed",
                                password: "oauthPas",
                                date_of_birth: new Date(),
                            }
                        });
                        token.user_id = newUser.user_id;
                    } else{
                        console.log("test");
                        token.user_id = existingUser.user_id;
                    }
                } else {
                    const credentialsExistingUser = await prisma.users.findFirst({
                        where: {
                            AND: [
                                {email: token.email ?? undefined},
                                {NOT: {password: "oauthPas"}}
                            ]
                        },
                    })
                    token.user_id  = credentialsExistingUser?.user_id;
                }
            }
            const data = {
                ...token,
                ...user,
                ...account
            }
            return {
                user_id: data.user_id ?? 0,
                name: data.name ?? undefined,
                email: data.email ?? undefined,
                image: data.image ?? undefined,
            };
        },
        async session({ session, token }) {
            if(token && token.user_id){
                return {
                    ...session,
                    user: {
                        id: Number(token.user_id ?? 0),
                        name: session.user.name ?? undefined,
                        email: session.user.email ?? undefined,
                        image: (token.picture ?? token.image) as string ?? undefined,
                    }
                }satisfies Session;
            }
            return session;
        }

    },
    session:{
        strategy: "jwt"
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login"
    }
};