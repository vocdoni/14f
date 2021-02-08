import { FC } from "react";
import { NextComponentType, NextPageContext } from "next";
import { AppInitialProps } from "next/app";
import { Router } from "next/router";
import { UsePoolProvider, UseProcessProvider } from "@vocdoni/react-hooks";
import { EthNetworkID } from "dvote-js";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

import "../styles/globals.css";

type NextAppProps = AppInitialProps & {
    Component: NextComponentType<NextPageContext, any, any>;
    router: Router;
};

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
        enabled: process.env.NODE_ENV === "production",
        dsn: "https://ac5db5d7dbbb4086971de74d9acbf522@o390133.ingest.sentry.io/5626619",
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
    });
}

const CustomBooth: FC<NextAppProps> = ({ Component, pageProps }) => {
    const bootnodeUri = process.env.BOOTNODES_URL;
    const networkId = process.env.ETH_NETWORK_ID as EthNetworkID;

    return (
        <UsePoolProvider bootnodeUri={bootnodeUri} networkId={networkId}>
            <UseProcessProvider>
                <Component {...pageProps} />
            </UseProcessProvider>
        </UsePoolProvider>
    );
};

export default CustomBooth;
