import Container from './container';

const Thanks = ({ nullifier }) => {
    return <Container>
        <header>
            <h1 className="mb-5 text-3xl font-bold leading-none tracking-tight text-center text-gray-900 lg:text-4xl sm:mb-7">
                👏
                <div>Gràcies per participar</div>
            </h1>
        </header>
        <p className="mb-3 font-medium text-vocdoni">
            El teu identificant de participació és:
        </p>
        <p className="p-4 mb-3 font-mono text-sm font-medium text-center border border-blue-100 rounded-xl">
            {nullifier}
        </p>
        <p className="font-medium text-vocdoni">
            Amb aquest identificador podràs validar que la teva opció ha estat correctament comptada en qualsevol moment. Els resultats es faran públics tan bon punt es tanquin els col·legis electorals.
        </p>
    </Container>;
};

export default Thanks;
