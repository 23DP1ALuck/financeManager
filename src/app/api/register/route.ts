// app/api/register/route.ts
import { NextResponse } from "next/server";
import schema from "@/lib/utils/schema";
import { prisma } from "@/lib/utils/db";
import bcrypt from "bcryptjs";

interface RegistrationError {
    message: string;
}
const findExistingUser = async (email: string, username: string) => {
    return prisma.users.findFirst({
        where: {
            OR:[
                {email: email.toLowerCase()},
                {username: username}
            ]
        }
    });
}
export async function POST(req: Request) {
    const formData = await req.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const username = formData.get("username")?.toString();


    try {
        const validatedData = schema.parse({ email, password, username });
        if(await findExistingUser(validatedData.email, validatedData.username)){
            return NextResponse.json({ success: false, registrationError: { message: "User already exists" } });
        }
        await prisma.users.create({
            data: {
                email: validatedData.email.toLowerCase(),
                username: validatedData.username,
                password: await bcrypt.hash(validatedData.password, 10),
                date_of_birth: new Date(),
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        const registrationError : RegistrationError = {
            message: err instanceof Error ? err.message : "Unknown error occurred"
        }
        return NextResponse.json({ success: false, registrationError });
    }
}
