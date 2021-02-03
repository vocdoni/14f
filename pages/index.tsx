import Link from 'next/link'
import { withRouter, useRouter } from 'next/router'
// import Spinner from "react-svg-spinner"

import { ProcessInfo, usePool, useProcesses } from '@vocdoni/react-hooks'
import { useEffect, useState } from 'react'
import { VotingApi } from 'dvote-js'
import Spinner from "react-svg-spinner"

// MAIN COMPONENT
const IndexPage = (props) => {
    const processIds: string[] = process.env.PROCESS_ID_LIST as any || [] as string[]

    // const router = useRouter()
    const { poolPromise, error: poolError, refresh: poolRefresh } = usePool()
    const [blockNumber, setBlockNumber] = useState(0)
    const [loadingProcesses, setLoadingProcesses] = useState(false)
    const { processes, loading, error } = useProcesses(processIds)

    // EFFECTS

    // Block height
    useEffect(() => {
        const updateBlockHeight = () => {
            poolPromise
                .then(pool => VotingApi.getBlockHeight(pool))
                .then(num => setBlockNumber(num))
                .catch(err => console.error(err))
        }

        const interval = setInterval(() => updateBlockHeight, 1000 * 15)
        updateBlockHeight()

        // Done
        return () => clearInterval(interval)
    }, [])


    // CALLBACKS

    // DATA ARRANGING

    const upcomingProcesses = processIds.filter(
        id => processes.has(id) && blockNumber < processes.get(id).parameters.startBlock
    )
    const activeProcesses = processIds.filter(
        id => processes.has(id) && blockNumber >= processes.get(id).parameters.startBlock &&
            blockNumber < (processes.get(id).parameters.startBlock + processes.get(id).parameters.blockCount)
    )
    const endedProcesses = processIds.filter(
        id => processes.has(id) && blockNumber >= (processes.get(id).parameters.startBlock + processes.get(id).parameters.blockCount)
    )
    const allProcessesLoaded = processIds.every(id => processes.has(id))


    // RENDER

    return <div id="index">
        <div className="page-head">
            <h1>Bridge</h1>
            <h4 className="accent-1">Trustless governance for Token holders</h4>
        </div>

        <div className="row-1">
            <div className="left">
                <h4>Submit proposals for <span className="accent-1">ERC20</span> tokens and vote on them using a decentralized end-to-end verifiable <span className="accent-1">layer 2</span> blockchain.</h4>
                <p><small>
                    <a href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/" className="accent-1" target="_blank">
                        What is an ERC20 Token?
                    </a>
                </small></p>
            </div>
            <div className="right">
                <p className="light">Lorem ipsum dolor sit amen. Lorem ipsum dolor sit amen. </p>
            </div>
        </div>

        <br /><br />

        <div className="row-2">
            <div className="left">
                <div style={{ backgroundColor: "#ccc", borderRadius: "50%", height: 140, width: 140 }}></div>
            </div>
            <div className="right">
                <h2>Speak up</h2>
                <h4>Find your token on the list and vote on the decisions that will make it grow. Be the first one to register it if it doesn’t exist and create your first proposal.</h4>
                <p><small>
                    <a href="https://www.notion.so/Introducing-Vocdoni-Bridge-cf7e73d38c4a45788358e9a1497cdf19#0481a4a6fd5b4f5c90bb67784f2a86ba" className="accent-1" target="_blank">
                        Learn more
                    </a>
                </small></p>
            </div>
        </div>

        <br /><br />
        <div className="row-main">
            <h2>Active votes</h2>
            <p className="light">{
                endedProcesses.length ?
                    "Below are the votes available." :
                    "There are no active votes at this moment."
            }</p>

            <div className="token-list">
                {
                    (loadingProcesses || !allProcessesLoaded) ? <Spinner /> :
                        activeProcesses.map((id, idx) => <div>
                            <Link href={id ? ("/processes#/" + id) : ""} key={idx} />
                            <p>{processes.get(id).metadata.title.default || "No title"}</p>
                        </div>)
                }
            </div>
        </div>

        <div className="row-main">
            <h2>Vote results</h2>
            <p className="light">{
                endedProcesses.length ?
                    "Below are the results available." :
                    "There are no votes with results to display."
            }</p>

            <div className="token-list">
                {
                    (loadingProcesses || !allProcessesLoaded) ? <Spinner /> :
                        endedProcesses.map((id, idx) => <div>
                            <Link href={id ? ("/processes#/" + id) : ""} key={idx} />
                            <p>{processes.get(id).metadata.title.default || "No title"}</p>
                        </div>)
                }
            </div>
        </div>

        <div className="row-main">
            <h2>Upcoming votes</h2>
            <p className="light">{
                upcomingProcesses.length ?
                    "Below are the votes scheduled to start soon." :
                    "There are no votes scheduled to start soon."
            }</p>

            <div className="token-list">
                {
                    (loadingProcesses || !allProcessesLoaded) ? <Spinner /> :
                        upcomingProcesses.map((id, idx) => <div>
                            <Link href={id ? ("/processes#/" + id) : ""} key={idx} />
                            <p>{processes.get(id).metadata.title.default || "No title"}</p>
                        </div>)
                }
            </div>
        </div>


    </div>
}

export default withRouter(IndexPage)
