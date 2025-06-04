import {WALLETS} from "@/generated/prisma";

export type Wallet = {
    account_id: number,
    name: WALLETS,
    balance: number,
    isPrimary: boolean,
};