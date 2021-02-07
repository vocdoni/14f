import { useRouter } from "next/router";

declare type Option = {
    icon: string;
    name: string;
};

const VotingBooth = ({ options, onClick }) => {
    return (
        <>
            <header>
                <h1 className="mt-8 mb-6 text-lg font-bold leading-none tracking-tight text-center text-gray-900 sm:text-3xl lg:text-4xl sm:mt-12 sm:mb-8">
                    Tria la teva fruita preferida!
                </h1>
            </header>
            <div className="grid grid-cols-4 gap-4">
                {options
                    .slice(0, options.length - 2)
                    .sort(() => Math.random() - 0.5)
                    .concat(...options.slice(options.length - 2))
                    .map((option) => {
                        const value: any = process.env.OPTIONS[option.title.default];
                        return (
                            <button
                                key={option.value}
                                onClick={() => onClick(value, option.value)}
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
