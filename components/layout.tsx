import React from "react";
import Head from "next/head";
import { renderToStaticMarkup } from "react-dom/server";
import PoweredByVocdoni from "./powered_by";

const FruitsBackground = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 76.8"
            width="800"
            height="76.8"
            style={{ opacity: 0.135, filter: `grayscale(0.75)` }}
        >
            <text
                x="0.25em"
                y="1em"
                fontSize="32"
                transform="rotate(30 20 19.2)"
            >
                🍍
            </text>
            <text
                x="1.5em"
                y="2em"
                fontSize="32"
                transform="rotate(30 60 51.2)"
            >
                🍋
            </text>
            <text
                x="2.75em"
                y="1em"
                fontSize="32"
                transform="rotate(30 100 19.2)"
            >
                🍈
            </text>
            <text x="4em" y="2em" fontSize="32" transform="rotate(30 140 51.2)">
                🌹
            </text>
            <text
                x="5.25em"
                y="1em"
                fontSize="32"
                transform="rotate(30 180 19.2)"
            >
                🍊
            </text>
            <text
                x="6.5em"
                y="2em"
                fontSize="32"
                transform="rotate(30 220 51.2)"
            >
                🍆
            </text>
            <text
                x="7.75em"
                y="1em"
                fontSize="32"
                transform="rotate(30 260 19.2)"
            >
                🥑
            </text>
            <text x="9em" y="2em" fontSize="32" transform="rotate(30 300 51.2)">
                💧
            </text>
            <text
                x="10.25em"
                y="1em"
                fontSize="32"
                transform="rotate(30 340 19.2)"
            >
                🥦
            </text>
            <text
                x="11.5em"
                y="2em"
                fontSize="32"
                transform="rotate(30 380 51.2)"
            >
                🍙
            </text>
            <text
                x="12.75em"
                y="1em"
                fontSize="32"
                transform="rotate(30 420 19.2)"
            >
                🍉
            </text>
            <text
                x="14em"
                y="2em"
                fontSize="32"
                transform="rotate(30 460 51.2)"
            >
                🍌
            </text>
            <text
                x="15.25em"
                y="1em"
                fontSize="32"
                transform="rotate(30 500 19.2)"
            >
                🧊
            </text>
            <text
                x="16.5em"
                y="2em"
                fontSize="32"
                transform="rotate(30 540 51.2)"
            >
                🌶️
            </text>
            <text
                x="17.75em"
                y="1em"
                fontSize="32"
                transform="rotate(30 580 19.2)"
            >
                🧄
            </text>
            <text
                x="19em"
                y="2em"
                fontSize="32"
                transform="rotate(30 620 51.2)"
            >
                🍅
            </text>
            <text
                x="20.25em"
                y="1em"
                fontSize="32"
                transform="rotate(30 660 19.2)"
            >
                🥟
            </text>
            <text
                x="21.5em"
                y="2em"
                fontSize="32"
                transform="rotate(30 700 51.2)"
            >
                🧁
            </text>
            <text
                x="22.75em"
                y="1em"
                fontSize="32"
                transform="rotate(30 740 19.2)"
            >
                🌽
            </text>
            <text
                x="24em"
                y="2em"
                fontSize="32"
                transform="rotate(30 780 51.2)"
            >
                🍏
            </text>
            <text
                x="25.25em"
                y="1em"
                fontSize="32"
                transform="rotate(30 780 51.2)"
            >
                🍄
            </text>
            <text
                x="26.5em"
                y="2em"
                fontSize="32"
                transform="rotate(30 780 51.2)"
            >
                🥘
            </text>
        </svg>
    );
};

const Layout = ({ page = undefined, children }) => {
    const svgString = renderToStaticMarkup(<FruitsBackground />);

    return (
        <div id="layout" className="flex flex-col">
            <Head>
                <title>14Fruites</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap"
                    rel="stylesheet"
                />
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta httpEquiv="content-language" content="ca" />
                <meta property="og:title" content="14Fruites" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:description"
                    content="14Fruites és una prova pilot de vot digital que s'executarà en paral·lel a les eleccions al Parlament de Catalunya del 14 de febrer. Durant la jornada electoral podràs participar-hi identificant-te amb el teu idCAT Certificat, seleccionant un partit, representat per emojis, i dipositant el teu vot de forma anònima a l'urna virtual gràcies a la tecnologia de signatura cega."
                />
                <meta
                    property="og:image"
                    content="https://14fruites.cat/social_banner.png"
                />
                <meta property="og:url" content="https://14fruites.cat/" />
                <meta property="og:site_name" content="14Fruites" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@vocdoni" />
                <meta
                    name="twitter:image"
                    content="https://14fruites.cat/social_banner.png"
                />
            </Head>
            <main className="flex flex-col flex-1 w-3/5 max-w-screen-lg mx-auto">
                <div className="flex-1">{children}</div>
                <footer className="flex py-10">
                    <PoweredByVocdoni />
                </footer>
            </main>
            <style jsx>{`
                #layout {
                    min-height: 100vh;
                    background-image: url(/14f.svg);
                    background-attachment: fixed;
                    background-position: -70% 25%;
                    background-repeat: no-repeat;
                }
            `}</style>
        </div>
    );
};

export default Layout;
