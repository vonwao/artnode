// require("dotenv").config();
const axios = require("axios");

const covalentAPIKey = "cqt_rQfDHV4cHP83F7qb7C8qtv7vXrkC";
const nftContractAddress = "0xd9b78a2f1dafc8bb9c60961790d2beefebee56f4";
const chainId = "1"; // Use the appropriate chain ID (1 for Ethereum, 137 for Polygon, etc.)

const url = `https://api.covalenthq.com/v1/${chainId}/tokens/${nftContractAddress}/nft_transactions/?key=${covalentAPIKey}`;

async function fetchNftTransfersCovalent() {
  try {
    const response = await axios.get(url);
    const nftTransfers = response.data.data.items;

    // Process and store the NFT transfer data
    const transfers = nftTransfers.map((transfer) => {
      return {
        from: transfer.from_address,
        to: transfer.to_address,
        tokenId: transfer.token_id,
        transactionHash: transfer.transaction_hash,
        blockNumber: transfer.block_height,
      };
    });

    console.log(transfers);
    // Here you can further process the data or store it in a file/database
  } catch (error) {
    console.error("Error fetching NFT transfer data:", error);
  }
}

fetchNftTransfersCovalent();
