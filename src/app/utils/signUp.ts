import React from "react";
import schema from "./schema";
import {prisma} from "./db";
import bcrypt from "bcryptjs";

interface RegistrationError {
    message: string;
}

export const signUp = async (formData : FormData) => {
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");
    try{
        const validatedData = schema.parse({email, password, username});
        await prisma.users.create({
            data: {
                email : validatedData.email.toLowerCase(),
                username : validatedData.username,
                password : await bcrypt.hash(validatedData.password, 10),
                date_of_birth : new Date()
            }
        })
        return { success: true };
    } catch (error) {
        const registrationError : RegistrationError = {
            message: error instanceof Error ? error.message : "Unknown error occurred"
        }
        return {success: false, registrationError};
    }

};