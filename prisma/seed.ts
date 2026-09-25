import { CATEGORY_NAME, PrismaClient, WALLETS } from "../src/generated/prisma";
import bcrypt from "bcryptjs";
import {
    buildDemoTransactions,
    DEMO_ACCOUNTS,
    DEMO_CATEGORY_NAMES,
    DemoCategoryName,
} from "./seed-data";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("admin", 10);

    await prisma.$transaction(async (database) => {
        const demoUser = await database.users.upsert({
            where: { username: "admin" },
            update: {
                email: "admin@example.com",
                password: hashedPassword,
            },
            create: {
                username: "admin",
                email: "admin@example.com",
                password: hashedPassword,
                date_of_birth: new Date("2000-01-01"),
            },
        });

        const categoryIds = new Map<DemoCategoryName, number>();
        for (const categoryName of DEMO_CATEGORY_NAMES) {
            const category =
                (await database.categories.findFirst({
                    where: { name: categoryName as CATEGORY_NAME },
                })) ??
                (await database.categories.create({
                    data: { name: categoryName as CATEGORY_NAME },
                }));

            categoryIds.set(categoryName, category.category_id);
        }

        await database.transactions.deleteMany({
            where: { user_id: demoUser.user_id },
        });
        await database.accounts.deleteMany({
            where: { user_id: demoUser.user_id },
        });

        const accountIds = new Map<string, number>();
        for (const account of DEMO_ACCOUNTS) {
            const createdAccount = await database.accounts.create({
                data: {
                    user_id: demoUser.user_id,
                    name: account.name as WALLETS,
                    balance: account.balance,
                    isPrimary: account.isPrimary,
                },
            });

            accountIds.set(account.name, createdAccount.account_id);
        }

        const transactions = buildDemoTransactions().map((transaction) => ({
            user_id: demoUser.user_id,
            account_id: accountIds.get(transaction.accountName)!,
            category_id: categoryIds.get(transaction.categoryName)!,
            transaction_name: transaction.transactionName,
            transaction_description: transaction.transactionDescription,
            amount: transaction.amount,
            date: transaction.date,
        }));

        await database.transactions.createMany({ data: transactions });

        console.log(
            `Seeded admin@example.com with ${DEMO_ACCOUNTS.length} wallets and ${transactions.length} transactions.`
        );
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
