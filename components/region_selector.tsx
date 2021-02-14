import Container from "./container";
import StatisticsForm from "./statistics_form";

const regions: Array<{ key: string; name: string }> = [
    { key: "barcelona", name: "Barcelona" },
    { key: "girona", name: "Girona" },
    { key: "lleida", name: "Lleida" },
    { key: "tarragona", name: "Tarragona" },
];

const RegionSelector = ({ onSelect, onBackNavigation, onStatsUpdate }) => {
    return (
        <Container>
            <header>
                <div className="text-sm font-light text-center lg:mb-2 mt-7 text-vocdoni lg:text-lg">
                    Pas 02 de 03
                </div>
                <h1 className="mb-5 text-2xl font-bold leading-none tracking-tight text-center text-gray-900 lg:text-3xl sm:mb-7 mt-7">
                    I quina és la teva circumscripció electoral?
                </h1>
            </header>
            <StatisticsForm onCodeUpdate={(value) => onStatsUpdate("postalcode", value)} onResidencyUpdate={(value) => onStatsUpdate("residency", value)} />
            <div className="grid grid-cols-1 gap-4 mb-6 text-2xl">
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
                    className="w-full bg-translucent hover:bg-gray-100 lg:w-auto"
                    onClick={onBackNavigation}
                >
                    ⬅️ Anar a l'inici
                </button>
            </div>
        </Container>
    );
};

export default RegionSelector;
