// This file is evaluated when exporting the frontend application
// The environment variabled need to be set locally on in the CI/CD console

const lang = "ca";
const DEVELOPMENT = process.env.NODE_ENV !== "production";

const optionsDefinitions = {

    psc: {
        full: 'Partit Socialista de Catalunya',
        icon: "🌹",
        name: "PSC",
    },
    erc: {
        full: 'Esquerra Republicana de Catalunya',
        icon: "🍋",
        name: "ERC",
    },
    pdecat: {
        full: 'Partit Demòcrata Europeu Català',
        icon: "🥑",
        name: "PDeCAT",
    },
    cup: {
        full: 'Candidatura d\'Unitat Popular',
        icon: "🍍",
        name: "CUP-G",
    },
    jxcat: {
        full: 'Junts per Catalunya',
        icon: "🍈",
        name: "JxCat",
    },
    pp: {
        full: 'Partit Popular',
        icon: "💧",
        name: "PP",
    },
    cs: {
        full: 'Ciutadans',
        icon: "🍊",
        name: "Cs",
    },
    ecp: {
        full: 'En Comú Podem',
        icon: "🍆",
        name: "ECP-PEC",
    },
    vox: {
        full: 'Vox',
        icon: "🥦",
        name: "VOX",
    },
    pctc: {
        full: 'Partit Comunista dels Treballadors de Catalunya',
        icon: "🌶️",
        name: "PCTC",
    },
    izqp: {
        full: 'Izquierda en Positivo',
        icon: "🍅",
        name: "IZQP",
    },
    mpic: {
        full: 'Moviment Primàries per la Independència de Catalunya',
        icon: "🍌",
        name: "Primàries",
    },
    pnc: {
        full: 'Partit Nacionalista De Catalunya',
        icon: "🍏",
        name: "PNC",
    },
    fnc: {
        full: 'Front Nacional de Catalunya',
        icon: "🧊",
        name: "FNC",
    },
    rc: {
        full: 'Recortes Cero-Grup Verd-Municipalistes',
        icon: "🍉",
        name: "RECORTES CERO-GV-M",
    },
    pumj: {
        full: 'Per Un Món Més Just',
        icon: "🧁",
        name: "PUM+J",
    },
    uep: {
        full: 'Unión Europea De Pensionistas',
        icon: "🧄",
        name: "Unión Europea de Pensionistas",
    },
    acv: {
        full: 'Alianza por el Comercio y la Vivienda',
        icon: "🥟",
        name: "Alianza C V",
    },
    eb: {
        full: 'Escons en Blanc',
        icon: "⬜",
        name: "Escons en Blanc",
    },
    scat: {
        full: 'Suport Civil Català',
        icon: "🌽",
        name: "Suport Civil Català",
    },
    ebre: {
        full: 'Som Terres de l’Ebre',
        icon: "🍙",
        name: "Som Terres de l'Ebre",
    },
    unidos: {
        full: 'Unidos por la Democracia + Jubilados',
        icon: "🥘",
        name: "Unidos por la Democracia + Jubilados",
    },
    mcr: {
        full: 'Moviment Corrent Roig',
        icon: "🍄",
        name: "Moviment Corrent Roig",
    },
    blank: {
        full: 'Vots en Blanc',
        icon: "🧻",
        name: "En blanc",
    },
    void: {
        full: 'Vots Nuls',
        icon: "💩",
        name: "Nul",
    },
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
