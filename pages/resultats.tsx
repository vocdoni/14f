import Layout from "../components/layout";
import Container from "../components/container";

const ResultsPage = () => {
    return (
        <Layout>
            <Container>
                <header>
                    <h1 className="mb-5 text-2xl font-bold leading-none tracking-tight text-center text-gray-900 lg:text-3xl sm:mb-7 mt-7">
                        <div>Resultats</div>
                    </h1>
                </header>
                <div className="text-sm lg:text-base">
                    <p className="mb-3 font-medium text-vocdoni">
                        Els resultats del sondeig 14Fruites estaran disponibles en aquesta web pocs minuts després del tancament dels col·legis electorals
                    </p>
                </div>
            </Container>
        </Layout >
    );
};

export default ResultsPage;
