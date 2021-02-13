import Container from "./container";
import { useState } from "react";

const GDPRAcceptance = ({ onAccept }) => {
    const [accepted, setAccepted] = useState<boolean>(false);

    return (
        <Container>
            <header>
                <div className="mb-2 font-light text-center mt-7 text-vocdoni text-md lg:text-lg">
                    Pas 01 de 03
                </div>
                <h1 className="mb-5 text-3xl font-bold leading-none tracking-tight text-center text-gray-900 lg:text-4xl sm:mb-7 mt-7">
                    <div>Termes i condicions</div>
                </h1>
            </header>
            <p className="mb-3">
                En compliment del que disposa el Reglament 2016/679, del
                Parlament Europeu i del Consell, de 27 d'abril de 2016 (RGPD),
                VOCDONI, com responsable del tractament, us informo que les
                vostres dades personals són necessàries precisos per a la
                prestació del servei d'enquesta sol·licitat, i que aquestes
                dades seran tractades, conforme a què està establert al registre
                de les activitats de tractament previst a l’article 30 del RGPD.
            </p>
            <p className="mb-3">
                Igualment us subministro la informació següent:
            </p>
            <h2 className="mb-2 font-bold text-vocdoni">
                Informació bàsica sobre Protecció de Dades
            </h2>
            <dl className="grid grid-cols-4 gap-2 mb-6 text-sm">
                <dt className="col-auto font-bold">Responsable</dt>
                <dd className="col-span-3">
                    Les dades de caràcter personal que es recolliran directament
                    de l'interessat seran tractades de forma confidencial i
                    quedaran incorporades a l'activitat de tractament
                    corresponent titularitat de VOCDONI.
                </dd>
                <dt className="col-auto font-bold">Finalitat</dt>
                <dd className="col-span-3">
                    La prestació deguda dels serveis de sondeig electoral per
                    Internet.
                </dd>
                <dt className="col-auto font-bold">Legitimació</dt>
                <dd className="col-span-3">
                    La base legal pel tractament de les dades es el consentiment
                    al qual es refereix a l’article 6.1.a) RGPD, i l’article 7
                    RGPD.
                </dd>
                <dt className="col-auto font-bold">Destinataris</dt>
                <dd className="col-span-3">
                    Les dades personals no seran cedides a tercers, ni es
                    transferiran fora de la Unió Europea.
                </dd>
                <dt className="col-auto font-bold">Drets</dt>
                <dd className="col-span-3">
                    Accedir, rectificar i suprimir les dades, així com altres
                    drets, com se explica a la informació addicional.
                </dd>
                <dt className="col-auto font-bold">Informació addicional</dt>
                <dd className="col-span-3">
                    Podeu consultar la informació addicional i detallada sobre
                    Protecció de Dades a la nostra{" "}
                    <a
                        className="underline"
                        href="https://vocdoni.io/politica-priv-14fruites"
                    >
                        pàgina web
                    </a>
                    .
                </dd>
            </dl>
            <div className="p-4 mb-3 text-blue-800 bg-blue-100 border border-transparent text-md rounded-xl">
                Aquest servei és absolutament anònim. En cap cas el proveïdor d'aquest servei ni tercers poden saber la relació participant-opció escollida.
            </div>
            <div className="text-right">
                <div className="mb-1">
                    <input
                        id="accept"
                        type="checkbox"
                        onClick={(e) => setAccepted(e.currentTarget.checked)}
                    />
                    <label htmlFor="accept">
                        {" "}
                        Accepto els termes i condicions
                    </label>
                </div>
                <button
                    disabled={!accepted}
                    onClick={onAccept}
                    className="inline-flex items-center col-span-1 text-xl md:col-span-2 main-action"
                >
                    <span className="w-full text-center">➡️ Accedeix</span>
                </button>
            </div>
        </Container>
    );
};

export default GDPRAcceptance;
