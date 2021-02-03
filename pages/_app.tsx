import React, { FC } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { AppInitialProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import { Router } from 'next/router'
import { UsePoolProvider, UseProcessProvider } from '@vocdoni/react-hooks'
import { EthNetworkID } from 'dvote-js'

import '../styles/index.css'

type NextAppProps = AppInitialProps & { Component: NextComponentType<NextPageContext, any, any>; router: Router; }

const BridgeApp: FC<NextAppProps> = ({ Component, pageProps }) => {
    const bootnodeUri = process.env.BOOTNODES_URL
    const networkId = process.env.ETH_NETWORK_ID as EthNetworkID
    const title = process.env.PAGE_TITLE || ""

    return <UsePoolProvider bootnodeUri={bootnodeUri} networkId={networkId}>
        <UseProcessProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
            </Head>
            <Header />
            <div id="main">
                <Component {...pageProps} />
            </div>
            <Footer />
        </UseProcessProvider>
    </UsePoolProvider>
}

export default BridgeApp
