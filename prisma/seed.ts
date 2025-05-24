import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("admin", 10);

    await prisma.users.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            username: "admin",
            email: "admin@example.com",
            password: hashedPassword,
            date_of_birth: new Date("2000-01-01")
        }
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
    });
