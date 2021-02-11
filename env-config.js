// This file is evaluated when exporting the frontend application
// The environment variabled need to be set locally on in the CI/CD console

const lang = "ca";
const DEVELOPMENT = process.env.NODE_ENV !== "production";

const processes = {
    barcelona:
        "0x2e9b7c507d2869b908b340886fda7b1c2a38606d0f6e9af7b1c3e9a386c2fc0f",
    lleida:
        "0x2e9b7c507d2869b908b340886fda7b1c2a38606d0f6e9af7b1c3e9a386c2fc0f",
    girona:
        "0x2e9b7c507d2869b908b340886fda7b1c2a38606d0f6e9af7b1c3e9a386c2fc0f",
    tarragona:
        "0x2e9b7c507d2869b908b340886fda7b1c2a38606d0f6e9af7b1c3e9a386c2fc0f",
};

const optionsDefinitions = {
    psc: { icon: "🌹", name: "PSC" },
    erc: { icon: "🍋", name: "ERC" },
    pdecat: { icon: "🥑", name: "PDeCAT" },
    cup: { icon: "🍍", name: "CUP-G" },
    jxcat: { icon: "🍈", name: "JxCat" },
    pp: { icon: "💧", name: "PP" },
    cs: { icon: "🍊", name: "Cs" },
    ecp: { icon: "🍆", name: "ECP-PEC" },
    vox: { icon: "🥦", name: "VOX" },
    pctc: { icon: "🌶️", name: "PCTC" },
    izqp: { icon: "🍅", name: "IZQP" },
    mpic: { icon: "🍌", name: "Primàries" },
    pnc: { icon: "🍏", name: "PNC" },
    fnc: { icon: "🧊", name: "FNC" },
    rc: { icon: "🍉", name: "RECORTES CERO-GV-M" },
    blank: { icon: "⬜", name: "Vot en blanc" },
    void: { icon: "💩", name: "Vot nul" },
};

module.exports = {
    LANG: lang,
    DEVELOPMENT,

    // BLOCKCHAIN
    ETH_NETWORK_ID: process.env.ETH_NETWORK_ID || "xdai",
    ETH_NETWORK_ENVIRONMENT: process.env.ETH_NETWORK_ENVIRONMENT || "stg",
    ETH_CHAIN_ID: process.env.ETH_CHAIN_ID
        ? parseInt(process.env.ETH_CHAIN_ID)
        : 100,

    // VOCHAIN
    BLOCK_TIME: process.env.BLOCK_TIME || "12",
    PROCESSES: processes,
    OPTIONS: optionsDefinitions,

    // GATEWAYS
    BOOTNODES_URL: DEVELOPMENT
        ? "https://bootnodes.vocdoni.net/gateways.stg.json"
        : process.env.BOOTNODES_URL ||
          "https://bootnodes.vocdoni.net/gateways.json",

    // CA
    CA_URL: DEVELOPMENT
        ? "https://ci.vocdoni.net/ca"
        : process.env.CA_URL || "https://idcat.ca.vocdoni.net/ca",
};

console.log("Building the frontend with ENV:", module.exports);
