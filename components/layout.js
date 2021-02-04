import React from "react";
import Head from "next/head";

import { renderToStaticMarkup } from "react-dom/server";
import PoweredByVocdoni from "./powered_by";

class SvgBackground extends React.Component {
    render() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 76.8"
                width="800"
                height="76.8"
                style={{ opacity: 0.125, filter: `grayscale(0.75)` }}
            >
                <text
                    x="0em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 20 19.2)"
                >
                    🍍
                </text>
                <text
                    x="1.25em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 60 51.2)"
                >
                    🍋
                </text>
                <text
                    x="2.5em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 100 19.2)"
                >
                    🥑
                </text>
                <text
                    x="3.75em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 140 51.2)"
                >
                    🌹
                </text>
                <text
                    x="5em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 180 19.2)"
                >
                    🍊
                </text>
                <text
                    x="6.25em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 220 51.2)"
                >
                    🍒
                </text>
                <text
                    x="7.5em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 260 19.2)"
                >
                    🍈
                </text>
                <text
                    x="8.75em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 300 51.2)"
                >
                    💧
                </text>
                <text
                    x="10em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 340 19.2)"
                >
                    🍎
                </text>
                <text
                    x="11.25em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 380 51.2)"
                >
                    🍌
                </text>
                <text
                    x="12.5em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 420 19.2)"
                >
                    ☕️
                </text>
                <text
                    x="13.75em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 460 51.2)"
                >
                    🍫
                </text>
                <text
                    x="15em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 500 19.2)"
                >
                    🍿
                </text>
                <text
                    x="16.25em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 540 51.2)"
                >
                    🌶
                </text>
                <text
                    x="17.5em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 580 19.2)"
                >
                    🧀
                </text>
                <text
                    x="18.75em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 620 51.2)"
                >
                    🍆
                </text>
                <text
                    x="20em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 660 19.2)"
                >
                    🥜
                </text>
                <text
                    x="21.25em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 700 51.2)"
                >
                    🍅
                </text>
                <text
                    x="22.5em"
                    y="1em"
                    fontSize="32"
                    transform="rotate(30 740 19.2)"
                >
                    🍑
                </text>
                <text
                    x="23.75em"
                    y="2em"
                    fontSize="32"
                    transform="rotate(30 780 51.2)"
                >
                    🍉
                </text>
            </svg>
        );
    }
}

export default function Layout({ children }) {
    const svgString = renderToStaticMarkup(<SvgBackground />);

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
                <meta property="og:description" content="14Fruites és un sondeig paral·lel a la jornada electoral del 14 de febrer. Les respostes seran anònimes gràcies a un mecanisme criptogràfic integrat a la tecnologia Vocdoni, denominat 'signatura cega'." />
                <meta property="og:image" content="https://14fruites.cat/social_banner.png" />
                <meta property="og:url" content="https://14fruites.cat/" />
                <meta property="og:site_name" content="14Fruites és un sondeig paral·lel a la jornada electoral del 14 de febrer. Les respostes seran anònimes gràcies a un mecanisme criptogràfic integrat a la tecnologia Vocdoni, denominat 'signatura cega'." />
                <meta property="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@vocdoni" />
                <meta name="twitter:image" content="https://14fruites.cat/social_banner.png" />
            </Head>
            <main className="w-4/5 max-w-screen-lg mx-auto">{children}</main>
            <style jsx>{`
                #layout {
                    min-height: 100vh;
                    background-size: 800px 76.8px;
                    background-image: url('data:image/svg+xml;utf8,${svgString}');
                }
            `}</style>
        </div>
    );
}
