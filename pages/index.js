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
                <div className="mt-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-6xl lg:text-6xl sm:mt-12 sm:mb-8">
                    <img src="/logo_14F_alpha.png" width="200" />
                </div>
            </header>
            <div className="max-w-screen-lg mb-8 font-medium text-md sm:text-xl sm:leading-10 sm:mb-10">
                <p className="mb-2">Benvinguts a <Name />, una prova pilot de vot digital que s'executarà en paral·lel a les eleccions al Parlament de Catalunya del 14 de febrer.</p>
                <p className="mb-2">Durant la jornada electoral podràs participar-hi identificant-te amb el teu idCAT certificat, seleccionant un partit, representat per emojis, i dipositant el teu vot de forma anònima a l'urna virtual gràcies a la tecnologia de signatura cega. Però recorda que aquest vot no reemplaça el teu vot a les urnes 😉</p>
                <p className="mb-2">Els resultats les votacions es faran públics el 14 de febrer després del tancament dels col·legis electorals oficials i de forma gairebé immediata en aquesta mateixa pàgina web.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 space-y-4 text-center sm:space-y-0 sm:space-x-4">
                <div className="col-span-1">
                    <a href="http://eepurl.com/hpOlLv" target="_blank">
                        <button className="flex-none px-8 py-4 text-xl font-semibold leading-6 text-white transition-colors duration-200 bg-green-500 border border-transparent shadow sm:w-auto hover:bg-green-600 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none">
                            ✉️ Avisa'm!
                        </button>
                    </a>
                </div>
                <div className="hidden lg:block lg:col-span-1">&nbsp;</div>
                <div className="col-span-1 lg:col-span-8 px-4 py-4 text-md leading-6 text-blue-800 bg-blue-100 border border-transparent rounded-xl">
                    Si disposes d'un certificat idCAT, podràs participar-hi durant la jornada electoral del 14 de febrer de 2021. Consulta com aconseguir un idCAT certificat{" "}<a className="underline" href="https://www.idcat.cat/idcat/ciutada/menu.do" target="_blank">aquí</a>.
                </div>
            </div>
            <footer className="max-w-screen-lg py-8 mx-auto">
                <PoweredByVocdoni />
            </footer>
        </Layout>
    );
}
