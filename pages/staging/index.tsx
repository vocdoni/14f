import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Layout from "../../components/layout";
import Faker from "faker";
import Intro from "./components/intro";
import RegionSelector from "./components/region_selector";
import VotingBooth from "./components/voting_booth";
import Thanks from "./components/thanks";
import { usePool, useProcess } from "@vocdoni/react-hooks";
import { ProcessContractParameters } from "dvote-js";

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

const IndexPage = () => {
    const [message, setMessage] = useState<string>(null);
    const [token, setToken] = useState<string>(null);
    const [processId, setProcessId] = useState<string>(null);
    const processInfo = useProcess(processId);
    const [hasVoted, setHasVoted] = useState<boolean>(false);

    const checkCensus = async () => {
        rpcCall("auth")
            .then((result) => {
                setToken(result.response.token);
            })
            .catch((reason) => {
                setMessage(reason);
            });
    };

    const setProcess = (region: string) => {
        setProcessId(process.env.PROCESSES[region]);
    };

    const buildProof = () => {
        rpcCall("sign")
            .then((result) => {})
            .catch((reason) => {
                setMessage(reason);
            });
    };

    const castVote = (option: string) => {
        setHasVoted(confirm(`Confirmes el teu vot per ${option}?`));
    };

    useEffect(() => {
        if (message == null) return;

        alert(message);
    }, [message]);

    useEffect(() => {
        if (processInfo == null) return;

        if (processInfo.error != null) {
            setMessage(processInfo.error);
        }
    }, [processInfo]);

    return (
        <Layout>
            {(() => {
                if (token == null) return <Intro onClick={checkCensus} />;
                else if (processInfo.process == null)
                    return <RegionSelector onSelect={setProcess} />;
                else if (!hasVoted) return <VotingBooth onClick={castVote} />;
                else return <Thanks />;
            })()}
        </Layout>
    );
};

export default withRouter(IndexPage);
