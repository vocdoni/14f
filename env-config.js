// This file is evaluated when exporting the frontend application
// The environment variabled need to be set locally on in the CI/CD console

const lang = "ca"
const DEVELOPMENT = process.env.NODE_ENV !== "production"

const processIdList = [
    '0x3154ce39212ee5de64a8b51fbf43d3f61d4dbd8b4078f386507dfa581ba1afc0'
]

module.exports = {
    LANG: lang,
    DEVELOPMENT,
    PAGE_TITLE: "14 F",

    // BLOCKCHAIN
    ETH_NETWORK_ID: process.env.ETH_NETWORK_ID || "goerli",
    ETH_CHAIN_ID: process.env.ETH_CHAIN_ID ? parseInt(process.env.ETH_CHAIN_ID) : 5,

    // VOCHAIN
    BLOCK_TIME: process.env.BLOCK_TIME || "12",
    PROCESS_ID_LIST: processIdList,

    // GATEWAYS
    BOOTNODES_URL: DEVELOPMENT ? "https://bootnodes.vocdoni.net/gateways.dev.json" : (process.env.BOOTNODES_URL || "https://bootnodes.vocdoni.net/gateways.json"),
}

console.log("Building the frontend with ENV:", module.exports)
