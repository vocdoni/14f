const regions: Array<{ key: string; name: string }> = [
    { key: "barcelona", name: "Barcelona" },
    { key: "girona", name: "Girona" },
    { key: "lleida", name: "Lleida" },
    { key: "tarragona", name: "Tarragona" },
];

const RegionSelector = ({ onSelect }) => {
    return (
        <>
            <header>
                <h1 className="mt-8 mb-6 text-lg font-bold leading-none tracking-tight text-center text-gray-900 sm:text-3xl lg:text-4xl sm:mt-12 sm:mb-8">
                    Abans, quina és la teva circumscripció electoral?
                </h1>
            </header>
            <div className="grid grid-cols-2 gap-4 px-4 text-2xl sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
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
        </>
    );
};

export default RegionSelector;
