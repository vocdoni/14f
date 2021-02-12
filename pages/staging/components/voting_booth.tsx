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
import { usePool } from "@vocdoni/react-hooks";
import Container from "./container";
import Faker from 'faker';

var availableOptions = [];

function usePrevious<S>(value): S {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

declare interface Option {
    icon: string;
    name: string;
    value: number;
    element: HTMLElement;
}

const VotingBooth = ({ proc, onBackNavigation, onVote, onError }) => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [selectedOption, setSelectedOption] = useState<Option>(null);
    const previousOption = usePrevious<Option>(selectedOption);
    const [proof, setProof] = useState<IProofCA>(null);
    const options = proc?.metadata.questions[0].choices;
    const poolPromise = usePool();
    const [wallet, setWallet] = useState<Wallet>(null);

    if (availableOptions.length == 0 && options != null) {
        availableOptions = options
            .slice(0, options.length - 2)
            // .sort(() => Math.random() - 0.5)
            .concat(...options.slice(options.length - 2));
    }

    const warning = (
        <div className="px-4 py-4 mb-6 text-yellow-800 bg-yellow-100 border border-transparent text-md rounded-xl">
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
                className="text-3xl bg-translucent hover:bg-gray-100"
            >
                {content(value, option.title.default)}
            </button>
        );
    });

    const authenticate = async () => {
        onError(null);

        const wallet = Wallet.createRandom();
        const caBundle = new CaBundleProtobuf();

        setWallet(wallet);
        caBundle.setProcessid(
            new Uint8Array(Buffer.from(proc.id.replace("0x", ""), "hex"))
        );
        caBundle.setAddress(
            new Uint8Array(Buffer.from(wallet.address.replace("0x", ""), "hex"))
        );

        rpcCall("auth")
            .then((result) => {
                if (!result.response.ok) {
                    onError(
                        `${result.response.error}: ${result.response.reply}`
                    );
                    return;
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

                rpcCall("sign", { token: hexTokenR, messageHash: hexBlinded })
                    .then((result) => {
                        if (!result.response.ok) {
                            onError(
                                `${result.response.error}: ${result.response.reply}`
                            );
                            return;
                        }

                        const hexBlindSignature = result.response.caSignature;
                        const unblindedSignature = CensusCaApi.unblind(
                            hexBlindSignature,
                            userSecretData
                        );

                        setProof({
                            type: ProofCaSignatureTypes.ECDSA_BLIND,
                            signature: unblindedSignature,
                            voterAddress: wallet.address,
                        });
                        setDisabled(false);
                    })
                    .catch((reason) => {
                        onError(reason);
                    });
            })
            .catch((reason) => {
                onError(reason);
            });
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
            onVote(Faker.finance.ethereumAddress);
            return;

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
                .then(() => {
                    const nullifier = VotingApi.getSignedVoteNullifier(
                        wallet.address,
                        proc.id
                    );
                    onVote(nullifier);
                })
                .catch((err) => {
                    onError(err);
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
                <div className="mb-2 font-light text-center mt-7 text-vocdoni text-md lg:text-lg">
                    Pas 02 de 02
                </div>
                <h1 className="mb-5 text-3xl font-bold leading-none tracking-tight text-center text-gray-900 lg:text-4xl sm:mb-7">
                    Tria la teva fruita preferida!
                </h1>
            </header>
            {disabled ? warning : null}
            <div className="grid grid-cols-4 gap-4 mb-6">{buttons}</div>
            <div className="flex justify-end">
                <button
                    className="bg-translucent hover:bg-gray-100"
                    onClick={onBackNavigation}
                >
                    🔄 Canviar de circumscripció
                </button>
                <button
                    disabled={!disabled}
                    className="mx-4 main-action"
                    onClick={authenticate}
                >
                    👋 Identifica't
                </button>
                <button
                    disabled={disabled || selectedOption == null}
                    className="bg-translucent hover:bg-gray-100"
                    onClick={castVote}
                >
                    🗳️ Vota!
                </button>
            </div>
        </Container>
    );
};

export default VotingBooth;
