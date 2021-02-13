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
                    'text: "Ja he participat en el sondeig digital #14fruites sobre les eleccions catalanes del 14 de febrer. Participa-hi!',
            }),
            facebookButton({
                label: "Compartir",
                url: "https://14fruites.cat"
            }),
        ]);
    }, []);

    return (
        <Container>
            <header>
                <h1 className="mb-5 text-3xl font-bold leading-none tracking-tight text-center text-gray-900 lg:text-4xl sm:mb-7 mt-7">
                    👏
                    <div>Gràcies per participar</div>
                </h1>
            </header>
            <p className="mb-3 font-medium text-vocdoni">
                El teu identificant de participació és:
            </p>
            <p className="p-4 mb-3 font-mono text-sm font-medium text-center break-all border border-blue-100 rounded-xl">
                {nullifier?.replace(/^0x/, "")}
            </p>
            <p className="mb-6 font-medium text-vocdoni">
                Amb aquest identificant podràs validar que la teva opció ha
                estat correctament comptada en qualsevol moment.{" "}
                <strong>No el comparteixis!</strong> Els resultats es faran
                públics tan bon punt es tanquin els col·legis electorals.
            </p>
            <div>
                <h2 className="mb-2">
                    Comparteix la iniciativa a xarxes socials!
                </h2>
                <div id="shareButtons"></div>
            </div>
        </Container>
    );
};

export default Thanks;
