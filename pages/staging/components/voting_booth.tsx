import { useState, useEffect, useRef } from "react";
import Faker from "faker";

var availableOptions = null;

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

const VotingBooth = ({ options, onBackNavigation, onVote }) => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [selectedOption, setSelectedOption] = useState<Option>(null);
    const previousOption = usePrevious<Option>(selectedOption);

    if (availableOptions == null) {
        availableOptions = options
            .slice(0, options.length - 2)
            .sort(() => Math.random() - 0.5)
            .concat(...options.slice(options.length - 2));
    }

    const warning = (
        <div className="px-4 py-4 mb-6 text-yellow-800 bg-yellow-100 border border-transparent text-md rounded-xl">
            Per poder triar, has d'identificar-te primer. Recorda que necessites
            l'idCAT Certificat instal·lat al navegador. Un cop feta
            l'autenticació, s'activaran els botons de les fruites i per votar.
        </div>
    );

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
                {value.icon}
                <div className="pt-1 text-xs">{value.name}</div>
            </button>
        );
    });

    const authenticate = async () => {
        setDisabled(false);
        /* -- Temporary hack
        rpcCall("auth")
            .then((result) => {
                setToken(result.response.token);
            })
            .catch((reason) => {
                setMessage(reason);
            });
        rpcCall("sign")
            .then((result) => {})
            .catch((reason) => {
                setMessage(reason);
            });
        */
    };

    const rpcCall = async (method: string, options: any = {}): Promise<any> => {
        const request = Object.assign(
            { method: method, signatureType: "ECDSA_BLIND" },
            options
        );

        return fetch("https://127.0.0.1:8443/auth", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: Faker.git.commitSha,
                request: request,
                signature: "",
            }),
        }).then((response) => {
            return response.json();
        });
    };

    const castVote = () => {
        const { icon, name, value } = selectedOption;
        const result = confirm(`Confirmes el teu vot per ${icon} ${name}?`);
        onVote(result);
    };

    useEffect(() => {
        if (selectedOption == null) return;

        selectedOption.element.classList.add("bg-vocdoni");
        previousOption?.element.classList.remove("bg-vocdoni");
    }, [selectedOption]);

    return (
        <>
            <header>
                <h1 className="mt-8 mb-6 text-lg font-bold leading-none tracking-tight text-center text-gray-900 sm:text-3xl lg:text-4xl sm:mt-12 sm:mb-8">
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
        </>
    );
};

export default VotingBooth;
