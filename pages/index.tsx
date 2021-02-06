import Layout from "../components/layout";

const Name = () => {
    return (
        <>
            <span className="font-bold" style={{ color: "#6A759E" }}>
                14F
            </span>
            ruites
        </>
    );
};

const IndexPage = () => {
    return (
        <Layout>
            <header className="mt-8 mb-5 font-extrabold leading-none tracking-tight text-gray-900">
                <a href="/">
                    <img
                        src="/logo_14F_alpha.png"
                        className="mx-auto lg:mx-0"
                    />
                </a>
            </header>
            <div className="max-w-screen-lg mb-6 font-medium leading-5 lg:leading-7 text-md sm:text-xl">
                <p className="mb-3">
                    Benvinguts a <Name />, una prova pilot de vot digital que
                    s'executarà en paral·lel a les eleccions al Parlament de
                    Catalunya del 14 de febrer.
                </p>
                <p className="mb-3">
                    Durant la jornada electoral podràs participar-hi
                    identificant-te amb el teu idCAT Certificat, seleccionant un
                    partit, representat per emojis, i dipositant el teu vot de
                    forma anònima a l'urna virtual gràcies a la tecnologia de
                    signatura cega. Però recorda que aquest vot no reemplaça el
                    teu vot a les urnes 😉
                </p>
                <p>
                    Els resultats es faran públics el 14 de febrer després del
                    tancament dels col·legis electorals oficials i de forma
                    gairebé immediata en aquesta mateixa pàgina web.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-6 leading-5 md:grid-cols-10">
                <a
                    href="http://eepurl.com/hpOlLv"
                    target="_blank"
                    className="inline-flex items-center col-span-1 p-4 text-xl font-semibold text-white transition-colors duration-200 bg-green-500 border border-transparent shadow md:col-span-2 hover:bg-green-600 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none"
                >
                    <span className="w-full text-center">✉️ Avisa'm!</span>
                </a>
                <div className="col-span-1 px-4 py-4 text-blue-800 bg-blue-100 border border-transparent md:col-span-8 text-md rounded-xl">
                    Si disposes d'un certificat idCAT Certificat, podràs
                    participar-hi durant la jornada electoral del 14 de febrer
                    de 2021. Consulta com aconseguir-ne un{" "}
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
            <div className="text-xs leading-4 text-gray-600">
                <p className="mb-2">
                    Aquesta votació està organitzada per Vocdoni i no té
                    vinculació amb les eleccions al Parlament. Es tracta d'un
                    experiment que no compta amb un disseny integral que
                    compleixi tots els requisits d'una votació oficial, com
                    podrien ser un sistema avançat d'identificació o mecanismes
                    contra la coerció del vot.{" "}
                </p>
                <p className="mb-2">
                    El sistema implementa un mecanisme criptogràfic experimental
                    anomenat "signatura cega" que proporciona al votant la
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
                        href="https://blog.vocdoni.io/catalunya-acollira-una-primera-prova-de-vot-digital-paral-lela-a-les-eleccions-del-14f/"
                        target="_blank"
                        className="underline"
                    >
                        aquí
                    </a>{" "}
                    i la informació tècnica{" "}
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
        </Layout>
    );
};

export default IndexPage;
