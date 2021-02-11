import { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import Layout from "../../components/layout";
import Intro from "./components/intro";
import RegionSelector from "./components/region_selector";
import VotingBooth from "./components/voting_booth";
import Thanks from "./components/thanks";
import { useProcess } from "@vocdoni/react-hooks";
import Loader from "./components/loader";

const IndexPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>(null);
    const [hasEntered, setHasEntered] = useState<boolean>(false);
    const [region, setRegion] = useState<string>(null);
    const [processId, setProcessId] = useState<string>(null);
    const processInfo = useProcess(processId);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [nullifier, setNullifier] = useState<string>(null);

    const loadProcess = (region: string) => {
        setRegion(region);
        setIsLoading(true);
        setProcessId(process.env.PROCESSES[region]);
    };

    const handleVote = (value: string) => {
        setNullifier(value);
        setHasVoted(true);
    };

    useEffect(() => {
        if (message == null) return;

        alert(message);
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
                else if (region == null)
                    return <RegionSelector onSelect={loadProcess} onBackNavigation={() => setHasEntered(false)} />;
                else if (!hasVoted)
                    return (
                        <VotingBooth
                            proc={processInfo.process}
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
