import Layout from "../components/layout";
import PoweredByVocdoni from "../components/powered_by";

function Name() {
    return (
        <>
            <span style={{ color: "#6A759E" }}>14F</span>ruites
        </>
    );
}

export default function Home() {
    return (
        <Layout>
            <header>
                <h1 className="mt-8 mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-6xl lg:text-6xl sm:mt-12 sm:mb-8">
                    <Name />
                </h1>
            </header>
            <p className="max-w-screen-lg mb-8 font-medium text-md sm:text-xl sm:leading-10 sm:mb-10">
                <Name /> és un sondeig paral·lel a la jornada electoral del 14
                de febrer. Els ciutadans podran emetre el seu vot digital
                després d'autenticar-se amb el certificat idCAT i escollir la
                fruita, representant un partit polític, que desitgin. Les respostes
                seran anònimes gràcies a un mecanisme criptogràfic integrat a la
                tecnologia Vocdoni, denominat "signatura cega".
            </p>
            <div className="flex flex-wrap space-y-4 text-center sm:space-y-0 sm:space-x-4">
                <div className="w-full mr-auto md:w-auto">
                    <h2 className="mb-1">Vols saber-ne més?</h2>
                    <a href="http://eepurl.com/hpOlLv" target="_blank">
                        <button className="flex-none px-8 py-4 text-xl font-semibold leading-6 text-white transition-colors duration-200 bg-green-500 border border-transparent shadow sm:w-auto hover:bg-green-600 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none">
                            ✉️ Subscriu-te!
                        </button>
                    </a>
                </div>
                <div className="flex flex-wrap content-center w-auto px-8 py-4 text-xl leading-6 text-yellow-800 bg-yellow-100 border border-transparent rounded-xl">
                    ⚠️ Necessitaràs&nbsp;
                    <a
                        className="underline"
                        href="https://www.idcat.cat/idcat/ciutada/menu.do"
                        target="_blank"
                    >
                        idCAT Certificat
                    </a>
                    &nbsp;per a identificar-te.
                </div>
            </div>
            <footer className="max-w-screen-lg py-8 mx-auto">
                <PoweredByVocdoni />
            </footer>
        </Layout>
    );
}
