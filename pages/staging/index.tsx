import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Layout from "../../components/layout";
import Intro from "./components/intro";
import RegionSelector from "./components/region_selector";
import VotingBooth from "./components/voting_booth";
import Thanks from "./components/thanks";
import { useProcess } from "@vocdoni/react-hooks";
import Loader from "./components/loader";
import GDPRAcceptance from "./components/gdpr_acceptance";

declare interface statsRecord {
    postalcode: string;
    residency: string;
}

const IndexPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | Error>(null);
    const [hasEntered, setHasEntered] = useState<boolean>(false);
    const [hasAccepted, setHasAccepted] = useState<boolean>(false);
    const [region, setRegion] = useState<string>(null);
    const [processId, setProcessId] = useState<string>(null);
    const processInfo = useProcess(processId);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [nullifier, setNullifier] = useState<string>(null);

    const [stats, setStats] = useState<statsRecord>({
        postalcode: "",
        residency: "",
    });

    const updateStats = (key: string, value: string) => {
        stats[key] = value;
        setStats(stats);
    };

    const loadProcess = (region: string) => {
        setIsLoading(true);
        fetch("/process-ids.json?random=" + Math.random().toString().slice(2))
            .then((res) => res.json())
            .then((processMap) => {
                const pid = processMap[region];
                if (!pid)
                    throw new Error(
                        "No es poden carregar els detalls la circumscripció seleccionada"
                    );
                setRegion(region);
                setProcessId(pid);
            })
            .catch((err) => {
                setMessage(
                    err?.message ||
                        err?.toString() ||
                        "No es poden carregar els detalls la circumscripció seleccionada"
                );
            });
    };

    const handleVote = (value: string) => {
        setNullifier(value);
        setHasVoted(true);
    };

    useEffect(() => {
        if (message === null) return;

        let msg: string;
        if ((message as any) instanceof Error) msg = (message as any).message;
        else if (typeof message != "string")
            return alert("Hi ha hagut un error en connectar amb la xarxa");
        else msg = message;

        if (msg.includes("certificate already used"))
            return alert(
                "El teu certificat ja ha estat utilitzat per aquest procés"
            );
        else if (msg.includes("Could not fetch the process"))
            return alert(
                "No es poden carregar les dades del procés. Intenta-ho de nou en uns minuts."
            );
        else if (msg.includes("nullifier error"))
            return alert("Hi ha hagut un problema enregistrant el teu vot");

        alert("Hi ha hagut un error en processar la petició");
        console.error(msg);
    }, [message]);

    useEffect(() => {
        if (processInfo?.error != null) setMessage(processInfo.error);
        if (processInfo?.process == null) return;

        setIsLoading(false);
    }, [processInfo]);

    return (
        <Layout>
            {(() => {
                if (isLoading) return <Loader />;
                else if (!hasEntered)
                    return <Intro onClick={() => setHasEntered(true)} />;
                else if (!hasAccepted)
                    return (
                        <GDPRAcceptance onAccept={() => setHasAccepted(true)} />
                    );
                else if (region == null)
                    return (
                        <RegionSelector
                            onSelect={loadProcess}
                            onBackNavigation={() => setHasEntered(false)}
                            onStatsUpdate={updateStats}
                        />
                    );
                else if (!hasVoted)
                    return (
                        <VotingBooth
                            proc={processInfo.process}
                            stats={Object.values(stats)}
                            onVote={handleVote}
                            onBackNavigation={() => setRegion(null)}
                            onError={setMessage}
                        />
                    );
                else return <Thanks nullifier={nullifier} />;
            })()}
        </Layout>
    );
};

export default withRouter(IndexPage);
