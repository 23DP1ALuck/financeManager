export const DEMO_CATEGORY_NAMES = [
    "Food",
    "Transport",
    "Entertainment",
    "Subscribtions",
    "Education",
    "Income",
    "Other",
] as const;

export type DemoCategoryName = (typeof DEMO_CATEGORY_NAMES)[number];

export const DEMO_ACCOUNTS = [
    { name: "Swedbank", balance: 4280.35, isPrimary: true },
    { name: "Revolut", balance: 875.2, isPrimary: false },
    { name: "Cash", balance: 185, isPrimary: false },
] as const;

type DemoAccountName = (typeof DEMO_ACCOUNTS)[number]["name"];

type DemoTransactionTemplate = {
    transactionName: string;
    transactionDescription: string;
    amount: number;
    categoryName: DemoCategoryName;
    accountName: DemoAccountName;
    monthsAgo: number;
    day: number;
};

export type DemoTransaction = Omit<DemoTransactionTemplate, "monthsAgo" | "day"> & {
    date: Date;
};

const TRANSACTION_TEMPLATES: DemoTransactionTemplate[] = [
    { transactionName: "Monthly salary", transactionDescription: "Salary payment", amount: 3200, categoryName: "Income", accountName: "Swedbank", monthsAgo: 0, day: 1 },
    { transactionName: "Apartment rent", transactionDescription: "Monthly rent", amount: 920, categoryName: "Other", accountName: "Swedbank", monthsAgo: 0, day: 2 },
    { transactionName: "Rimi groceries", transactionDescription: "Weekly groceries", amount: 76.42, categoryName: "Food", accountName: "Swedbank", monthsAgo: 0, day: 5 },
    { transactionName: "Rigas Satiksme", transactionDescription: "Monthly public transport pass", amount: 30, categoryName: "Transport", accountName: "Revolut", monthsAgo: 0, day: 6 },
    { transactionName: "Netflix", transactionDescription: "Monthly streaming subscription", amount: 12.99, categoryName: "Subscribtions", accountName: "Revolut", monthsAgo: 0, day: 8 },
    { transactionName: "Coffee with friends", transactionDescription: "Weekend coffee", amount: 14.8, categoryName: "Food", accountName: "Cash", monthsAgo: 0, day: 10 },
    { transactionName: "Online course", transactionDescription: "TypeScript course", amount: 49, categoryName: "Education", accountName: "Revolut", monthsAgo: 0, day: 12 },
    { transactionName: "Cinema tickets", transactionDescription: "Friday movie night", amount: 24, categoryName: "Entertainment", accountName: "Revolut", monthsAgo: 0, day: 15 },
    { transactionName: "Circle K", transactionDescription: "Fuel", amount: 58.31, categoryName: "Transport", accountName: "Swedbank", monthsAgo: 0, day: 18 },
    { transactionName: "Lunch", transactionDescription: "Lunch near the office", amount: 11.5, categoryName: "Food", accountName: "Cash", monthsAgo: 0, day: 21 },
    { transactionName: "Freelance project", transactionDescription: "Website project payment", amount: 640, categoryName: "Income", accountName: "Revolut", monthsAgo: 0, day: 23 },
    { transactionName: "Monthly salary", transactionDescription: "Salary payment", amount: 3200, categoryName: "Income", accountName: "Swedbank", monthsAgo: 1, day: 1 },
    { transactionName: "Apartment rent", transactionDescription: "Monthly rent", amount: 920, categoryName: "Other", accountName: "Swedbank", monthsAgo: 1, day: 2 },
    { transactionName: "Maxima groceries", transactionDescription: "Weekly groceries", amount: 63.18, categoryName: "Food", accountName: "Swedbank", monthsAgo: 1, day: 7 },
    { transactionName: "Spotify", transactionDescription: "Music subscription", amount: 10.99, categoryName: "Subscribtions", accountName: "Revolut", monthsAgo: 1, day: 9 },
    { transactionName: "Bowling", transactionDescription: "Evening with friends", amount: 32, categoryName: "Entertainment", accountName: "Revolut", monthsAgo: 1, day: 14 },
    { transactionName: "Train to Jurmala", transactionDescription: "Weekend trip", amount: 5.4, categoryName: "Transport", accountName: "Revolut", monthsAgo: 1, day: 19 },
    { transactionName: "Books", transactionDescription: "Programming books", amount: 38.75, categoryName: "Education", accountName: "Swedbank", monthsAgo: 1, day: 24 },
    { transactionName: "Monthly salary", transactionDescription: "Salary payment", amount: 3050, categoryName: "Income", accountName: "Swedbank", monthsAgo: 2, day: 1 },
    { transactionName: "Apartment rent", transactionDescription: "Monthly rent", amount: 920, categoryName: "Other", accountName: "Swedbank", monthsAgo: 2, day: 2 },
    { transactionName: "Lidl groceries", transactionDescription: "Weekly groceries", amount: 54.67, categoryName: "Food", accountName: "Swedbank", monthsAgo: 2, day: 11 },
    { transactionName: "Concert", transactionDescription: "Summer concert ticket", amount: 45, categoryName: "Entertainment", accountName: "Revolut", monthsAgo: 2, day: 20 },
    { transactionName: "Monthly salary", transactionDescription: "Salary payment", amount: 3050, categoryName: "Income", accountName: "Swedbank", monthsAgo: 3, day: 1 },
    { transactionName: "Car service", transactionDescription: "Routine maintenance", amount: 210, categoryName: "Transport", accountName: "Swedbank", monthsAgo: 3, day: 16 },
    { transactionName: "Museum", transactionDescription: "Weekend museum visit", amount: 16, categoryName: "Entertainment", accountName: "Cash", monthsAgo: 3, day: 22 },
];

export function buildDemoTransactions(now: Date = new Date()): DemoTransaction[] {
    return TRANSACTION_TEMPLATES.map(({ monthsAgo, day, ...transaction }) => {
        const targetMonth = now.getMonth() - monthsAgo;
        const safeDay = monthsAgo === 0 ? Math.min(day, now.getDate()) : day;

        return {
            ...transaction,
            date: new Date(now.getFullYear(), targetMonth, Math.max(1, safeDay), 12),
        };
    });
}
