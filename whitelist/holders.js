// import { CovalentClient, calculatePrettyBalance } from "@covalenthq/client-sdk";
const {
  CovalentClient,
  calculatePrettyBalance,
} = require("@covalenthq/client-sdk");

async function fetchAndCalculateBalance() {
  const client = new CovalentClient("cqt_rQfDHV4cHP83F7qb7C8qtv7vXrkC"); // Replace with your Covalent API key.

  try {
    const resp = await client.BalanceService.getTokenBalancesForWalletAddress(
      "eth-mainnet",
      "0x390b12590ae2ed98cb0ec93f287517a949419c22"
    );
    const prettyBalance = calculatePrettyBalance(
      resp.data.items[0].balance,
      resp.data.items[0].contract_decimals
    );

    console.log(resp.data);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

fetchAndCalculateBalance();
