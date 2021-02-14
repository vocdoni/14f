import { usePool } from "@vocdoni/react-hooks";
import PoweredByVocdoni from "./powered_by";
import { Spinner } from "./loader";

const Name = () => {
    return (
        <>
            <span className="font-bold text-vocdoni">14F</span>
            ruites
        </>
    );
};

const Intro = ({ onClick }) => {
    const { pool, poolPromise, loading, error } = usePool();

    return (
        <>
            <header className="mt-16 mb-8 font-extrabold leading-none tracking-tight text-gray-900">
                <a href="/">
                    <img
                        src="/logo_14F_alpha.png"
                        className="mx-auto lg:mx-0"
                    />
                </a>
            </header>
            <div className="max-w-screen-lg mb-6 text-lg leading-6 lg:leading-7 lg:text-xl">
                <p className="mb-6 text-2xl font-medium lg:text-3xl">
                    Benvinguts a <Name />, un sondeig electoral per internet que
                    s'executarà en paral·lel a les eleccions al Parlament de
                    Catalunya del 14 de febrer, utilitzant la tecnologia de
                    participació digital de Vocdoni.
                </p>
                <p className="mb-6 font-light text-vocdoni">
                    Durant la jornada electoral podràs participar-hi
                    identificant-te amb el teu idCAT Certificat, seleccionant un
                    partit, representat per emojis, i seleccionant la teva
                    opció. Aquesta quedarà registrada de forma anònima gràcies a
                    la tecnologia de signatura cega. Però recorda que aquest
                    sondeig no reemplaça el teu vot a les urnes 😉
                </p>
                <p className="font-light text-vocdoni">
                    Els resultats es faran públics quasi bé immediatament
                    després del tancament dels col·legis electorals oficials.
                    Podràs consultar-los a la mateixa pàgina web del sondeig.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-6 leading-5 md:grid-cols-10">
                <button
                    disabled={loading}
                    onClick={onClick}
                    className="inline-flex items-center col-span-1 text-xl md:col-span-2 main-action"
                >
                    {loading ? (
                        <span className="w-full text-center">
                            <Spinner /> Carregant...
                        </span>
                    ) : (
                        <span className="w-full text-center">➡️ Continua</span>
                    )}
                </button>
                <div className="flex flex-col col-span-1 p-4 text-blue-800 bg-blue-100 border border-transparent md:col-span-6 text-md rounded-xl">
                    <div className="my-auto">
                        Si disposes d'un certificat idCAT Certificat, podràs
                        participar-hi durant la jornada electoral del 14 de
                        febrer de 2021. Consulta com aconseguir-ne un{" "}
                        <a
                            className="underline"
                            href="https://www.idcat.cat/idcat/ciutada/menu.do"
                            target="_blank"
                        >
                            aquí
                        </a>
                        .
                    </div>
                </div>
                <a
                    className="inline-flex items-center col-span-1 p-4 text-xl font-medium shadow bg-translucent hover:bg-gray-100 md:col-span-2 rounded-xl"
                    href="https://www.notion.so/Preguntes-freq-ents-14Fruites-6c04e6d2beb14ba282dc2b10b0feb59a"
                    target="_blank"
                >
                    <span className="w-full text-center faqs-icon">❓ FAQs</span>
                </a>
            </div>
            <div className="text-xs leading-4 text-gray-600">
                <p className="mb-2">
                    Aquest sondeig electrònic està organitzat per Vocdoni i no
                    té vinculació amb les eleccions al Parlament.
                </p>
                <p className="mb-2">
                    El sistema implementa un mecanisme criptogràfic experimental
                    anomenat "signatura cega" que proporciona al participant la
                    possibilitat d'utilitzar certificats tipus idCAT amb el grau
                    d'anonimat necessària per un sondeig d'aquest tipus. No
                    obstant en unes eleccions oficials es requereixen més
                    garanties com les incloses en el full de ruta de la{" "}
                    <a
                        href="https://docs.vocdoni.io/#/architecture/protocol/franchise-proof"
                        target="_blank"
                        className="underline"
                    >
                        plataforma de codi obert Vocdoni
                    </a>
                    .
                </p>
                <p>
                    Per saber-ne més consulta la nota de premsa{" "}
                    <a
                        href="https://www.notion.so/Catalunya-acollir-el-primer-sondeig-per-internet-de-les-eleccions-del-14F-amb-tecnologia-blockchain-699ee7eb98b84a11926b1e1676011d12"
                        target="_blank"
                        className="underline"
                    >
                        aquí
                    </a>{" "}
                    i la informació tècnica sobre la tecnologia de vot digital
                    que ho possibilita{" "}
                    <a
                        href="https://www.notion.so/Info-t-cnica-Votaci-amb-certificat-digital-b222379b80894380b6047036deedef5c"
                        target="_blank"
                        className="underline"
                    >
                        aquí
                    </a>
                    .
                </p>
            </div>
            <footer className="flex flex-col py-10">
                <PoweredByVocdoni />
                <div className="mt-2 text-xs">
                    <a className="underline" href="https://vocdoni.io/condiciones-de-uso-14fruites/">Condicions d'ús</a>
                    <a className="ml-3 underline" href="https://vocdoni.io/politica-priv-14fruites/">Política de privacitat</a>
                </div>
            </footer>
        </>
    );
};

export default Intro;
