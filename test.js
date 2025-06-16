const url = "/api/transactions?walletId=1&from=01-10-2021&to=01-11-2021&category=1"
const params = new URLSearchParams(url.split('?')[1]);
const selectedWallet = Number(params.get('walletId'));
console.log(params)
console.log(selectedWallet);