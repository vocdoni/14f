import React from "react";
import Head from "next/head";
import { renderToStaticMarkup } from "react-dom/server";

const Layout = ({ children }) => {
    return (
        <div id="layout" className="flex flex-col">
            <Head>
                <title>14Fruites - Sondeig electoral per Internet</title>
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
                    content="14Fruites un sondeig electoral per internet que s'executarà en paral·lel a les eleccions al Parlament de Catalunya del 14 de febrer, utilitzant la tecnologia de participació digital de Vocdoni."
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
            <main className="flex flex-col flex-1 w-4/5 max-w-screen-lg mx-auto lg:w-3/5">
                {children}
            </main>
            <style jsx>{`
                #layout {
                    min-height: 100vh;
                    background-image: url(/14f.svg);
                    background-attachment: fixed;
                    background-position: 35em -12.5em;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
            `}</style>
        </div>
    );
};

export default Layout;
