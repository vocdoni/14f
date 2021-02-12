import Container from './container';

const Thanks = ({ nullifier }) => {
    return <Container>
        <header>
            <h1 className="mt-8 mb-6 text-lg font-bold leading-none tracking-tight text-center text-gray-900 sm:text-3xl lg:text-4xl sm:mt-12 sm:mb-8">
                👏
                <div>Gràcies per votar</div>
            </h1>
        </header>
        <p className="mb-3 font-medium text-vocdoni">
            El teu identificador de vot és:
        </p>
        <p className="p-4 mb-3 font-mono text-sm font-medium text-center border border-blue-100 rounded-xl">
            {nullifier}
        </p>
        <p className="font-medium text-vocdoni">
            Amb aquest identificador podràs validar que el teu vot ha estat correctament comptat en qualsevol moment. Els resultats es faran públics tan bon punt es tanquin els col·legis electorals.
        </p>
    </Container>;
};

export default Thanks;
