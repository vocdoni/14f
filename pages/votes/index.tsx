import { useState, useEffect } from 'react'
import { VotingApi, IProofCA, ProofCaSignatureTypes, CaBundleProtobuf, DigestedProcessResults, ProcessMetadata, DigestedProcessResultItem, ProcessStatus, ProcessContractParameters } from 'dvote-js'
import { withRouter, useRouter } from 'next/router'
import Spinner from "react-svg-spinner"

import { usePool, useProcess } from '@vocdoni/react-hooks'
import { strDateDiff } from '../../lib/date'
import { PROCESS_ID } from '../../lib/regex'
import { BigNumber, utils, Wallet } from 'ethers'
import { areAllNumbers } from '../../lib/util'
import { useUrlHash } from 'use-url-hash'

const BN_ZERO = BigNumber.from(0)

// MAIN COMPONENT
const VotePage = props => {
    const router = useRouter()
    const { poolPromise } = usePool()
    const processId = useUrlHash().substr(1) || (process.env.PROCESS_ID_LIST[process.env.PROCESS_ID_LIST.length - 1])
    const { process: proc } = useProcess(processId)
    const [wallet, setWallet] = useState<Wallet>(null)
    const [startDate, setStartDate] = useState(null as Date)
    const [endDate, setEndDate] = useState(null as Date)
    const [censusProof, setCensusProof] = useState<string>(null)
    const [hasVoted, setHasVoted] = useState(false)
    const [refreshingVotedStatus, setRefreshingVotedStatus] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [choices, setChoices] = useState([] as number[])
    const [results, setResults] = useState(null as DigestedProcessResults)

    const nullifier = VotingApi.getSignedVoteNullifier(wallet?.address || "", processId)

    if (typeof window != "undefined" && !processId.match(PROCESS_ID)) {
        console.error("Invalid process ID", processId)
        router.replace('/')
    }

    // Effects

    useEffect(() => {
        let skip = false

        const refreshInterval = setInterval(() => {
            if (skip) return

            Promise.all([
                updateVoteStatus(),
                updateResults()
            ]).catch(err => console.error(err))
        }, 1000 * 20)

        return () => {
            skip = true
            clearInterval(refreshInterval)
        }
    }, [processId])

    // Vote results
    useEffect(() => { updateResults() }, [processId])

    // Vote status
    useEffect(() => { updateVoteStatus() }, [wallet, nullifier])

    // Dates
    useEffect(() => { updateDates() }, [proc?.parameters?.startBlock])

    // Loaders
    const updateVoteStatus = () => {
        if (!processId || !nullifier) return
        setRefreshingVotedStatus(true)

        poolPromise
            .then(pool => VotingApi.getEnvelopeStatus(processId, nullifier, pool))
            .then(({ registered }) => {
                setRefreshingVotedStatus(false)
                setHasVoted(registered)
            })
            .catch(err => {
                setRefreshingVotedStatus(false)
                console.error(err)
            })
    }
    const updateResults = () => {
        if (!processId) return

        poolPromise
            .then(pool => VotingApi.getResultsDigest(processId, pool))
            .then((results) => setResults(results))
            .catch(err => console.error(err))
    }
    const updateDates = () => {
        if (!proc?.parameters?.startBlock) return

        return poolPromise
            .then(pool => Promise.all([
                VotingApi.estimateDateAtBlock(proc.parameters.startBlock, pool),
                VotingApi.estimateDateAtBlock(proc.parameters.startBlock + proc.parameters.blockCount, pool)
            ])).then(([startDate, endDate]) => {
                setStartDate(startDate)
                setEndDate(endDate)
            }).catch(err => {
                console.error(err)
            })
    }


    // Callbacks
    const checkCensus = async () => {
        // Get R
        const wallet = Wallet.createRandom()
        setWallet(wallet)

        const caBundle = new CaBundleProtobuf()
        caBundle.setProcessid(new Uint8Array(Buffer.from((processId).replace("0x", ""), "hex")))
        caBundle.setAddress(new Uint8Array(Buffer.from((wallet.address).replace("0x", ""), "hex")))

        const hexBundle = utils.hexlify(caBundle.serializeBinary())    // 0x...
        const hexHashedBundle = utils.keccak256(hexBundle)            // 0x...

        // TODO: Call API backend to obtain R
        const R = await fetch(API_ENDPOINT_2, {})

        // FIXME: Future: const {M, S} = Blind(R, hexHashedBundle)

        // TODO: Call API backend to get the bundle signed
        // const signature = fetch(API_ENDPOINT_2, {R, M})                // future
        const signature = await fetch(API_ENDPOINT_2, { R, hexHashedBundle })  // meanwhile

        // FIXME: const signature = Unblind(R, M, S) // future

        // Done
        setCensusProof(signature)
    }

    const onSelect = (questionIdx: number, choiceValue: number) => {
        if (typeof choiceValue == "string") choiceValue = parseInt(choiceValue)
        if (isNaN(choiceValue)) return alert("Invalid question value")

        choices[questionIdx] = choiceValue
        setChoices([].concat(choices))
    }

    const onSubmitVote: () => Promise<void> = async () => {
        if (!confirm("You are about to submit your vote. This action cannot be undone.\n\nDo you want to continue?")) return

        try {
            setIsSubmitting(true)

            const pool = await poolPromise
            const proof: IProofCA = {
                type: ProofCaSignatureTypes.ECDSA,
                // type: ProofCaSignatureTypes.ECDSA_BLIND,   // future
                voterAddress: wallet?.address,
                signature: censusProof
            }

            // Detect encryption
            if (proc.parameters.envelopeType.hasEncryptedVotes) {
                const keys = await VotingApi.getProcessKeys(processId, pool)
                const { envelope, signature } = await VotingApi.packageSignedEnvelope({
                    votes: choices,
                    censusOrigin: proc.parameters.censusOrigin,
                    censusProof: proof,
                    processId,
                    walletOrSigner: wallet,
                    processKeys: keys
                })
                await VotingApi.submitEnvelope(envelope, signature, pool)
            } else {
                const { envelope, signature } = await VotingApi.packageSignedEnvelope({
                    votes: choices,
                    censusOrigin: proc.parameters.censusOrigin,
                    censusProof: proof,
                    processId,
                    walletOrSigner: wallet,
                })
                await VotingApi.submitEnvelope(envelope, signature, pool)
            }

            // wait a block
            await new Promise(resolve => setTimeout(resolve, Math.floor(parseInt(process.env.BLOCK_TIME) * 1000 * 1.2)))

            let voted = false
            for (let i = 0; i < 10; i++) {
                const { registered, date } = await VotingApi.getEnvelopeStatus(processId, nullifier, pool)
                voted = registered
                setHasVoted(voted)

                if (registered) break
                await new Promise(resolve => setTimeout(resolve, Math.floor(parseInt(process.env.BLOCK_TIME) * 500)))
            }
            if (!voted) throw new Error('The vote has not been registered')

            // detached update
            setTimeout(() => {
                updateResults()
                updateVoteStatus()
            })

            alert("Your vote has been sucessfully submitted")
            setIsSubmitting(false)
        }
        catch (err) {
            console.error(err)
            setIsSubmitting(false)
            alert("The delivery of your vote could not be completed")
        }
    }

    // Render params

    const allQuestionsChosen = areAllNumbers(choices) && choices.length == proc?.metadata?.questions?.length
    const hasStarted = startDate && startDate.getTime() <= Date.now()
    const hasEnded = endDate && endDate.getTime() < Date.now()
    const isInCensus = !!censusProof

    const canVote = proc && isInCensus && !hasVoted && hasStarted && !hasEnded

    const remainingTime = startDate ?
        (hasStarted ? strDateDiff("end-date", endDate) : strDateDiff("start-date", startDate)) : ""

    const statusStr = digestProcessStatusStr(proc.parameters, hasStarted, hasEnded)

    if (!processId || !proc) return renderEmpty()


    return <div id="process">
        <div className="page-head">
            <div className="left">
                <h1>Governance process</h1>
                <h4 className="accent-1">Cast your vote and see the ongoing results as they are received.</h4>
            </div>
            <div className="right">
                {/* <Status /> */}
            </div>
        </div>

        {
            censusProof ? null : <>
                <div>
                    <button onClick={checkCensus}>Check census</button>
                </div>
            </>
        }

        <div className="row-description">
            <div className="left">
                <h2>{proc.metadata.title.default || "No title"}</h2>
                <h4 className="accent-1">{statusStr}</h4>
                <p className="light">{proc.metadata.description.default || "No description"}</p>
            </div>
            <div className="right">
                <p className="light">{remainingTime}</p>
            </div>
        </div>

        <div className="row-questions">
            {
                proc.metadata.questions.map((question, qIdx) =>
                    renderQuestionRow(qIdx, question, results, canVote, hasVoted, !!wallet?.address, onSelect)
                )
            }
        </div>

        <br /><br />

        <div className="row-continue">
            {(() => {
                if (!processId || !proc) return <></>
                else if (hasVoted) return <p className="status">Your vote has been registered</p>
                else if (!hasStarted) return <p className="status">The process has not started yet</p>
                else if (hasEnded) return <p className="status">The process has ended</p>
                else if (!wallet?.address) return <p className="status">You are not connected to MetaMask</p>
                else if (!censusProof) return <p className="status">You are not part of the process holders' census</p>
                else if (!allQuestionsChosen) return <p className="status">Select a choice for every question</p>
                else if (isSubmitting || refreshingVotedStatus) return <p className="status">Please wait...<Spinner /></p>

                return <div onClick={() => onSubmitVote()}>Sign and submit the vote</div>
            })()}
        </div>
    </div>
}

function renderQuestionRow(qIdx: number, question: ProcessMetadata["questions"][0], results: DigestedProcessResults, canVote: boolean, hasVoted: boolean, hasWallet: boolean, onSelect: (qIdx: number, choiceValue: number) => any) {
    const resultsQuestion = results && results.questions[qIdx]

    const questionVoteCount = resultsQuestion &&
        resultsQuestion.voteResults.reduce((prev, cur) => prev.add(cur.votes || BN_ZERO), BN_ZERO)
        || BN_ZERO

    return <div className="question" key={qIdx}>
        <div className="left">
            <h6 className="accent-1">Question {qIdx + 1}</h6>
            <h3>{question.title.default || "No title"}</h3>
            <p className="light">{question.description.default || "No description"}</p>
        </div>
        <div className="right">
            {
                (() => {
                    if (!hasWallet || hasVoted) {
                        if (results?.questions?.length) return question.choices.map((choice, cIdx) => renderChoiceResults(cIdx, resultsQuestion, questionVoteCount))
                        else return question.choices.map((choice, cIdx) => renderReadOnlyChoice(cIdx, choice.title.default))
                    } else if (canVote) {
                        return question.choices.map((choice, cIdx) => renderClickableChoice(qIdx, cIdx, choice.title.default, choice.value, onSelect))
                    } else {
                        return question.choices.map((choice, cIdx) => renderReadOnlyChoice(cIdx, choice.title.default))
                    }
                })()
            }
        </div>
    </div>
}

function renderClickableChoice(questionIdx: number, choiceIdx: number, title: string, choiceValue: number, onSelect: (qIdx: number, choiceValue: number) => any) {
    return <label className="radio-choice" key={choiceIdx}> <input type="radio" onClick={() => onSelect(questionIdx, choiceValue)} name={"question-" + questionIdx} />
        <div className="checkmark"></div> {title}
    </label>
}

function renderReadOnlyChoice(choiceIdx: number, title: string) {
    return <label className="radio-choice" key={choiceIdx}> <input type="radio" checked={false} />
        <div className="checkmark"></div> {title}
    </label>
}

function renderChoiceResults(cIdx: number, resultsQuestion: DigestedProcessResultItem, totalVotes: BigNumber) {
    if (!resultsQuestion || !resultsQuestion.voteResults || !resultsQuestion.voteResults[cIdx]) return null

    const title = resultsQuestion.voteResults[cIdx].title.default
    const voteCount = resultsQuestion.voteResults[cIdx].votes || BN_ZERO
    const percent = Math.round(voteCount.mul(10000).div(totalVotes).toNumber()) / 100 // = voteCount / totalVotes * 100

    return <div className="choice-result" key={cIdx}>
        <div className="percent">
            <div className="box">{percent.toFixed(1)} %</div>
        </div>
        <div className="text">
            <span>{title}</span>
            <span className="lighter">{voteCount.toNumber()} votes</span>
        </div>
    </div>
}

// TODO:
function renderEmpty() {
    return <div>
        <br />
        <p>Loading... <Spinner /></p>
    </div>
}

function digestProcessStatusStr(proc: ProcessContractParameters, hasStarted: boolean, hasEnded: boolean): string {
    switch (proc.status.value) {
        case ProcessStatus.READY:
            if (hasEnded)
                return "The process is closed"
            else if (hasStarted)
                return "The process is open for voting"
            else if (!hasStarted)
                return "The process is ready and will start soon"
            break
        case ProcessStatus.PAUSED:
            return "The process is paused"
        case ProcessStatus.CANCELED:
            return "The process has been canceled"
        case ProcessStatus.ENDED:
        case ProcessStatus.RESULTS:
            return "The process has ended"
    }
    return ""
}

export default withRouter(VotePage)
