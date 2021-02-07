import { useRouter } from "next/router";

declare type Option = {
    icon: string;
    name: string;
};

const candidatures: Array<Option> = [
    { icon: "🌹", name: "PSC" },
    { icon: "🍋", name: "ERC" },
    { icon: "🥑", name: "PDeCAT" },
    { icon: "🍍", name: "CUP-G" },
    { icon: "🍈", name: "JxCat" },
    { icon: "💧", name: "PP" },
    { icon: "🍊", name: "Cs" },
    { icon: "🍆", name: "ECP-PEC" },
    { icon: "🥦", name: "VOX" },
    { icon: "🌶️", name: "PCTC" },
    { icon: "🍅", name: "IZQP" },
    { icon: "🍌", name: "Primàries" },
    { icon: "🍏", name: "PNC" },
    { icon: "🧊", name: "FNC" },
    { icon: "🍉", name: "RECORTES CERO-GV-M" },
];

const additionalOptions: Array<Option> = [
    { icon: "⬜", name: "Vot en blanc" },
    { icon: "💩", name: "Vot nul" },
];

const VotingBooth = ({ onClick }) => {
    const confirm = (e) => {
        onClick(e.target.innerText.replace("\n", " "));
    };

    return (
        <>
            <header>
                <h1 className="mt-8 mb-6 text-lg font-bold leading-none tracking-tight text-center text-gray-900 sm:text-3xl lg:text-4xl sm:mt-12 sm:mb-8">
                    Tria la teva fruita preferida!
                </h1>
            </header>
            <div className="grid grid-cols-4 gap-4">
                {candidatures
                    .sort(() => Math.random() - 0.5)
                    .concat(...additionalOptions)
                    .map((value) => {
                        return (
                            <button
                                key={value.name}
                                onClick={confirm}
                                className="px-4 py-4 text-3xl shadow bg-translucent hover:bg-gray-100"
                            >
                                {value.icon}
                                <div className="pt-1 text-xs">{value.name}</div>
                            </button>
                        );
                    })}
            </div>
        </>
    );
};

export default VotingBooth;
