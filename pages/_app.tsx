import React, { FC } from "react";
import { NextComponentType, NextPageContext } from "next";
import { AppInitialProps } from "next/app";
import { Router } from "next/router";
import { UsePoolProvider, UseProcessProvider } from "@vocdoni/react-hooks";
import { EthNetworkID } from "dvote-js";

import "../styles/globals.css";

type NextAppProps = AppInitialProps & {
    Component: NextComponentType<NextPageContext, any, any>;
    router: Router;
};

const CustomBooth: FC<NextAppProps> = ({ Component, pageProps }) => {
    const bootnodeUri = process.env.BOOTNODES_URL;
    const networkId = process.env.ETH_NETWORK_ID as EthNetworkID;

    return (
        <UsePoolProvider bootnodeUri={bootnodeUri} networkId={networkId}>
            <UseProcessProvider>
                <Component {...pageProps} />;
            </UseProcessProvider>
        </UsePoolProvider>
    );
};

export default CustomBooth;
