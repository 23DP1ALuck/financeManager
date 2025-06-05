import {WALLETS} from "@/generated/prisma";

export type Wallet = {
    account_id: number,
    name: WALLETS,
    balance: number,
    isPrimary: boolean,
};
export type Transactions = {
    transaction_id: number,
    amount: number,
    date: Date,
    account_id: number,
    category: {
        name: string
    },
    user_id: number,
    transaction_name: string,
    transaction_description: string,
}