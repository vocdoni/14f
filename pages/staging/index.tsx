import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Layout from "../../components/layout";
import Intro from "./components/intro";
import RegionSelector from "./components/region_selector";
import VotingBooth from "./components/voting_booth";
import Thanks from "./components/thanks";
import { useProcess } from "@vocdoni/react-hooks";
import Loader from "./components/loader";

const IndexPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>(null);
    const [hasEntered, setHasEntered] = useState<boolean>(false);
    const [region, setRegion] = useState<string>(null);
    const [processId, setProcessId] = useState<string>(null);
    const processInfo = useProcess(processId);
    const [hasVoted, setHasVoted] = useState<boolean>(false);

    const loadProcess = (region: string) => {
        setRegion(region);
        setIsLoading(true);
        setProcessId(process.env.PROCESSES[region]);
    };

    useEffect(() => {
        if (message == null) return;

        alert(message);
    }, [message]);

    useEffect(() => {
        if (processInfo?.process == null) return;
        if (processInfo.error != null) setMessage(processInfo.error);

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
                            options={
                                processInfo.process.metadata.questions[0]
                                    .choices
                            }
                            onVote={setHasVoted}
                            onBackNavigation={() => setRegion(null)}
                            onError={setMessage}
                        />
                    );
                else return <Thanks />;
            })()}
        </Layout>
    );
};

export default withRouter(IndexPage);
