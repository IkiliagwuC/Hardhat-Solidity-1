require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-verify")
//require("@nomiclabs/hardhat-waffles")
require("dotenv").config()
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

const sepolia_RPC_URL =
    process.env.sepolia_RPC_URL || "https://eth-sepolia/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "key"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    solidity: "0.8.18",
    networks: {
        sepolia: {
            url: sepolia_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts: provided already
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        ouputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
}

//prints the list of accounts
// task("accounts", "Prints the list of accounts", async () => {
//     const accounts = await ethers.getSigners()

//     for (const account of accounts) {
//         console.log(account.address)
//     }
// })
