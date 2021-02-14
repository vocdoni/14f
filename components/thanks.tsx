import Container from "./container";
import { useEffect, useState } from "react";
import {
    renderShareButtons,
    twitterButton,
    facebookButton,
} from "@socialshares/core";

const Thanks = ({ nullifier }) => {
    useEffect(() => {
        const mountElement = document.getElementById("shareButtons");
        renderShareButtons(mountElement, [
            twitterButton({
                label: "Piular",
                url: "https://14fruites.cat",
                text:
                    "Ja he participat en el sondeig digital #14fruites sobre les eleccions catalanes del 14 de febrer #eleccions14F Participa-hi!",
            }),
            facebookButton({
                label: "Compartir",
                url: "https://14fruites.cat",
            }),
        ]);
    }, []);

    return (
        <Container>
            <header>
                <h1 className="mb-5 text-2xl font-bold leading-none tracking-tight text-center text-gray-900 lg:text-3xl sm:mb-7 mt-7">
                    👏
                    <div>Gràcies per participar</div>
                </h1>
            </header>
            <div className="text-sm lg:text-base">
                <p className="mb-3 font-medium text-vocdoni">
                    El teu identificant de participació és:
                </p>
                <p className="p-4 mb-3 font-mono text-xs font-medium text-center break-all border border-blue-100 lg:text-sm rounded-xl">
                    {nullifier?.replace(/^0x/, "")}
                </p>
                <p className="mb-3 font-medium text-vocdoni">
                    Amb aquest identificant podràs validar que la teva opció ha
                    estat correctament comptada en qualsevol moment.{" "}
                    <strong>No el comparteixis!</strong> Els resultats es faran
                    públics tan bon punt es tanquin els col·legis electorals.
                </p>
                <div className="px-4 py-4 mb-6 text-sm text-yellow-800 bg-yellow-100 border border-transparent lg:text-md rounded-xl">
                    Et recomanem que esperis un temps prudencial (com a mínim
                    uns minuts) abans de compartir la teva experiència a les
                    xarxes socials. Més informació a les{" "}
                    <a className="underline" href="https://www.notion.so/Preguntes-freq-ents-14Fruites-6c04e6d2beb14ba282dc2b10b0feb59a">
                        FAQs
                    </a>
                    .
                </div>
                <div>
                    <h2 className="mb-2">
                        Comparteix la iniciativa a xarxes socials!
                    </h2>
                    <div id="shareButtons"></div>
                </div>
            </div>
        </Container>
    );
};

export default Thanks;
