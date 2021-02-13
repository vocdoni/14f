import Container from "./container";

const regions: Array<{ key: string; name: string }> = [
    { key: "barcelona", name: "Barcelona" },
    { key: "girona", name: "Girona" },
    { key: "lleida", name: "Lleida" },
    { key: "tarragona", name: "Tarragona" },
];

const RegionSelector = ({ onSelect, onBackNavigation }) => {
    return (
        <Container>
            <header>
                <div className="mb-2 font-light text-center mt-7 text-vocdoni text-md lg:text-lg">
                    Pas 02 de 03
                </div>
                <h1 className="mb-5 text-3xl font-bold leading-none tracking-tight text-center text-gray-900 lg:text-4xl sm:mb-7">
                    I quina és la teva circumscripció electoral?
                </h1>
            </header>
            <div className="grid grid-cols-1 gap-4 text-2xl mb-14 sm:mb-20 xl:mb-8">
                {regions.map((value) => {
                    return <button
                        key={value.key}
                        onClick={() => onSelect(value.key)}
                        className="main-action"
                    >
                        {value.name}
                    </button>;
                })}
            </div>
            <div className="flex justify-left">
                <button
                    className="bg-translucent hover:bg-gray-100"
                    onClick={onBackNavigation}
                >
                    ⬅️ Anar a l'inici
                </button>
            </div>
        </Container>
    );
};

export default RegionSelector;
