export const fetchWallets = async () => {
    const wallets = await fetch("/api/wallets");
    return await wallets.json();
}