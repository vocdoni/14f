import { useState, useEffect, useRef } from "react";
import { utils, Wallet } from "ethers";
import {
    CaBundleProtobuf,
    CensusCaApi,
    GatewayPool,
    IProofCA,
    ProofCaSignatureTypes,
    Random,
    VotingApi,
} from "dvote-js";
import { ProcessInfo, usePool } from "@vocdoni/react-hooks";
import Container from "./container";
import { Spinner } from "./loader";

var availableOptions = [];

function usePrevious<S>(value): S {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function useCachedWallet() {
    if (typeof window == "undefined") return { wallet: Wallet.createRandom(), storeWallet: (_) => { }, clearWallet: () => { } }

    const [wallet] = useState<Wallet>(window["localStorage"].getItem("ephemeral-privk") ?
        new Wallet(window["localStorage"].getItem("ephemeral-privk")) : Wallet.createRandom())

    const storeWallet = (w: Wallet) => {
        window["localStorage"].setItem("ephemeral-privk", w.privateKey)
    };

    const clearWallet = () => {
        window["localStorage"].removeItem("ephemeral-privk")
    }

    return { wallet, storeWallet, clearWallet }
}

function useCachedProof() {
    if (typeof window == "undefined") return { proof: {} as IProofCA, storeCaProof: (_) => { }, clearProof: () => { } }

    const [proof, setProof] = useState<IProofCA>(JSON.parse(window["localStorage"].getItem("ephemeral-proof") || "{}"))

    const storeCaProof = (proof: IProofCA) => {
        window["localStorage"].setItem("ephemeral-proof", JSON.stringify(proof))
        setProof(proof)
    }
    const clearProof = () => {
        window["localStorage"].removeItem("ephemeral-proof")
        setProof(null)
    }

    return { proof, storeCaProof, clearProof }
}

declare interface Option {
    icon: string;
    name: string;
    value: number;
    element: HTMLElement;
}

const VotingBooth = ({ proc, stats, onBackNavigation, onVote, onError }: { proc: ProcessInfo, stats: any, onBackNavigation: () => void, onVote: (value: string) => void, onError: (err: string | Error) => void }) => {
    const { proof, storeCaProof, clearProof } = useCachedProof()
    const { wallet, storeWallet, clearWallet } = useCachedWallet()
    const [disabled, setDisabled] = useState<boolean>(!proof || !proof.signature || !proof.voterAddress || !proof.type);
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option>(null);
    const previousOption = usePrevious<Option>(selectedOption);
    const options = proc?.metadata.questions[0].choices;
    const poolPromise = usePool();
    const [voting, setVoting] = useState<boolean>(false);

    if (availableOptions.length == 0 && options != null) {
        availableOptions = options
            .slice(0, options.length - 2)
            // .sort(() => Math.random() - 0.5)
            .concat(...options.slice(options.length - 2));
    }

    const warning = (
        <div className="px-4 py-4 mb-6 text-sm text-yellow-800 bg-yellow-100 border border-transparent lg:text-md rounded-xl">
            Per poder triar, has d'identificar-te primer. Recorda que necessites
            l'idCAT Certificat instal·lat al navegador. Un cop feta
            l'autenticació, s'activaran els botons de les fruites i per votar.
        </div>
    );

    const content = (value, fallback) => {
        if (value == undefined) {
            return <>
                <div className="pt-1 text-xs">{fallback}</div>
            </>
        }

        return <>
            {value.icon}
            <div className="pt-1 text-xs">{value.name}</div>
        </>;
    }

    const buttons = availableOptions.map((option) => {
        const value: any = process.env.OPTIONS[option.title.default];
        return (
            <button
                key={option.value}
                disabled={disabled}
                onClick={(e) =>
                    setSelectedOption({
                        icon: value.icon,
                        name: value.name,
                        value: option.value,
                        element: e.currentTarget,
                    })
                }
                className="text-3xl bg-translucent hover:bg-gray-100 hover:text-black"
            >
                {content(value, option.title.default)}
            </button>
        );
    });

    const authenticate = async () => {
        setAuthenticating(true);
        onError(null);

        const caBundle = new CaBundleProtobuf();

        caBundle.setProcessid(
            new Uint8Array(Buffer.from(proc.id.replace("0x", ""), "hex"))
        );
        caBundle.setAddress(
            new Uint8Array(Buffer.from(wallet.address.replace("0x", ""), "hex"))
        );
        storeWallet(wallet)

        rpcCall("auth", { authData: stats })
            .then((result) => {
                if (!result.response.ok) {
                    throw new Error(`${result.response.error}: ${result.response.reply}`);
                }

                const hexTokenR = result.response.token;
                const tokenR = CensusCaApi.decodePoint(hexTokenR);

                const hexCaBundle = utils.hexlify(caBundle.serializeBinary());
                const hexCaHashedBundle = utils
                    .keccak256(hexCaBundle)
                    .substr(2);
                const { hexBlinded, userSecretData } = CensusCaApi.blind(
                    hexCaHashedBundle,
                    tokenR
                );

                return rpcCall("sign", { token: hexTokenR, messageHash: hexBlinded })
                    .then((result) => {
                        if (!result.response.ok) {
                            throw new Error(`${result.response.error}: ${result.response.reply}`)
                        }

                        const hexBlindSignature = result.response.caSignature;
                        const unblindedSignature = CensusCaApi.unblind(
                            hexBlindSignature,
                            userSecretData
                        );

                        const caProof = {
                            type: ProofCaSignatureTypes.ECDSA_BLIND,
                            signature: unblindedSignature,
                            voterAddress: wallet.address,
                        }
                        storeCaProof(caProof);
                        setDisabled(false);
                    })
            })
            .catch((reason: Error) => {
                onError(reason?.message || reason?.toString?.() || reason);
            })
            .finally(() => setAuthenticating(false));
    };

    const rpcCall = async (method: string, options: any = {}): Promise<any> => {
        const request = Object.assign(
            { method: method, signatureType: "ECDSA_BLIND" },
            options
        );

        return fetch(process.env.CA_URL, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: Random.getHex().substr(2, 10),
                request: request,
                signature: "",
            }),
        }).then((response) => {
            return response.json();
        });
    };

    const castVote = async () => {
        const { icon, name, value } = selectedOption;
        var result = confirm(`Confirmes el teu vot per ${icon} ${name}?`);
        if (result) {
            setVoting(true)

            const choices = [value];
            const pool = (poolPromise.pool as unknown) as GatewayPool;
            const processKeys = proc.parameters.envelopeType.hasEncryptedVotes
                ? await VotingApi.getProcessKeys(proc.id, pool)
                : null;

            const { envelope, signature } = proc.parameters.envelopeType
                .hasEncryptedVotes
                ? await VotingApi.packageSignedEnvelope({
                    censusOrigin: proc.parameters.censusOrigin,
                    votes: choices,
                    censusProof: proof,
                    processId: proc.id,
                    walletOrSigner: wallet,
                    processKeys,
                })
                : await VotingApi.packageSignedEnvelope({
                    censusOrigin: proc.parameters.censusOrigin,
                    votes: choices,
                    censusProof: proof,
                    processId: proc.id,
                    walletOrSigner: wallet,
                });

            VotingApi.submitEnvelope(envelope, signature, pool)
                .then(async () => {
                    const nullifier = VotingApi.getSignedVoteNullifier(
                        wallet.address,
                        proc.id
                    );
                    for (let i = 0; i < 10; i++) {
                        const { registered, date } = await VotingApi.getEnvelopeStatus(proc.id, nullifier, pool)
                        if (registered) {
                            clearWallet()
                            clearProof()
                            return onVote(nullifier)
                        }
                        await new Promise((resolve) => setTimeout(resolve, Math.floor(Number(process.env.BLOCK_TIME) * 500)))
                    }
                    throw new Error("check nullifier error")
                })
                .catch((err) => {
                    onError(err);
                    setVoting(false)
                });
        }
    };

    useEffect(() => {
        if (selectedOption == null) return;

        selectedOption.element.classList.add("bg-vocdoni");
        previousOption?.element.classList.remove("bg-vocdoni");
    }, [selectedOption]);

    return (
        <Container>
            <header>
                <div className="text-sm font-light text-center lg:mb-2 mt-7 text-vocdoni lg:text-lg">
                    Pas 03 de 03
                </div>
                <h1 className="mb-5 text-2xl font-bold leading-none tracking-tight text-center text-gray-900 lg:text-3xl sm:mb-7 mt-7">
                    Tria la teva fruita preferida!
                </h1>
            </header>
            <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">{buttons}</div>
            {disabled ? warning : null}
            <div className="flex flex-col lg:flex-row lg:justify-between">
                <button
                    className="w-full mb-3 lg:w-auto lg:float-left lg:mb-0 bg-translucent hover:bg-gray-100"
                    onClick={onBackNavigation}
                >
                    ⬅️ Canvia de circumscripció
                </button>
                {
                    disabled ?
                    <button
                        disabled={authenticating}
                        className="w-full lg:ml-4 main-action lg:w-44"
                        onClick={authenticate}
                    >
                        {
                            authenticating ?
                                <span><Spinner /> Identificant...</span> :
                                <span>👋 Identifica't</span>
                        }
                    </button> :
                    <button
                        disabled={selectedOption == null || voting}
                        className="w-full lg:ml-4 main-action lg:w-44"
                        onClick={castVote}
                    >
                        {
                            voting ?
                                <span><Spinner /> Votant...</span> :
                                <span>
                                    <span className='vote-icon'>🗳️</span> Vota!
                                </span>
                            }
                        </button>
                }
            </div>
        </Container>
    );
};

export default VotingBooth;
