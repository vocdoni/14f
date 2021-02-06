import { useRouter, withRouter } from "next/router";
import Layout from "../../components/layout";

const candidatures: Array<string[]> = [
    ["🌹", "PSC"],
    ["🍋", "ERC"],
    ["🥑", "PDeCAT"],
    ["🍍", "CUP-G"],
    ["🍈", "JxCat"],
    ["💧", "PP"],
    ["🍊", "Cs"],
    ["🍆", "ECP-PEC"],
    ["🥦", "VOX"],
    ["🌶", "PCTC"],
    ["🍅", "IZQP"],
    ["🍌", "Primàries"],
    ["🍏", "PNC"],
    ["🧊", "FNC"],
    ["🍉", "RECORTES CERO-GV-M"],
];

const additionalOptions: Array<string[]> = [
    ["⬜", "Vot en blanc"],
    ["💩", "Vot nul"],
];

const ProcessPage = () => {
    const router = useRouter();

    const Confirm = (e) => {
        e.preventDefault();

        const mustVote = confirm(
            `Confirmes el teu vot per ${e.target.innerText.replace("\n", " ")}?`
        );
        if (mustVote) {
            router.push("/staging/thanks");
        }
    };

    return (
        <Layout>
            <header>
                <h1 className="mt-8 mb-6 text-lg font-bold leading-none tracking-tight text-center text-gray-900 sm:text-3xl lg:text-4xl sm:mt-12 sm:mb-8">
                    Tria la teva fruita preferida!
                </h1>
            </header>
            <div className="grid grid-cols-4 gap-4">
                {candidatures.sort(() => Math.random() - 0.5).map((value) => {
                    return (
                        <button
                            onClick={Confirm}
                            className="px-4 py-4 text-3xl shadow bg-translucent hover:bg-gray-100"
                        >
                            {value[0]}
                            <div className="pt-1 text-xs">{value[1]}</div>
                        </button>
                    );
                })}
                {additionalOptions.map((value) => {
                    return (
                        <button
                            onClick={Confirm}
                            className="px-4 py-4 text-3xl shadow bg-translucent hover:bg-gray-100"
                        >
                            {value[0]}
                            <div className="pt-1 text-xs">{value[1]}</div>
                        </button>
                    );
                })}
            </div>
        </Layout>
    );
};

export default withRouter(ProcessPage);
