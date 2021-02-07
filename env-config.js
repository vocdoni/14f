// This file is evaluated when exporting the frontend application
// The environment variabled need to be set locally on in the CI/CD console

const lang = "ca"
const DEVELOPMENT = process.env.NODE_ENV !== "production"

const processes = {
    'barcelona': '0x957ec50ca71004e660c1cb9f6700e0d865dce4e95bf086d6ecaf3c227e0d0ee6',
    'lleida': '0x3154ce39212ee5de64a8b51fbf43d3f61d4dbd8b4078f386507dfa581ba1afc0',
    'girona': '0x3154ce39212ee5de64a8b51fbf43d3f61d4dbd8b4078f386507dfa581ba1afc0',
    'tarragona': '0x3154ce39212ee5de64a8b51fbf43d3f61d4dbd8b4078f386507dfa581ba1afc0',
}

module.exports = {
    LANG: lang,
    DEVELOPMENT,

    // BLOCKCHAIN
    ETH_NETWORK_ID: process.env.ETH_NETWORK_ID || "goerli",
    ETH_CHAIN_ID: process.env.ETH_CHAIN_ID ? parseInt(process.env.ETH_CHAIN_ID) : 5,

    // VOCHAIN
    BLOCK_TIME: process.env.BLOCK_TIME || "12",
    PROCESSES: processes,

    // GATEWAYS
    BOOTNODES_URL: DEVELOPMENT ? "https://bootnodes.vocdoni.net/gateways.dev.json" : (process.env.BOOTNODES_URL || "https://bootnodes.vocdoni.net/gateways.json"),
}

console.log("Building the frontend with ENV:", module.exports)
