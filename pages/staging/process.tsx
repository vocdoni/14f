import { useRouter, withRouter } from "next/router";
import Layout from "../../components/layout";

const ProcessPage = () => {
    const router = useRouter()

    const Confirm = (e) => {
        e.preventDefault()
    
        const mustVote = confirm(`Confirmes el teu vot per ${e.target.innerText.replace("\n", " ")}?`)
        if (mustVote) {
            router.push('/staging/thanks')
        }
    }

    return (
        <Layout>
            <header>
                <h1 className="mt-8 mb-6 text-lg font-bold leading-none tracking-tight text-center text-gray-900 sm:text-3xl lg:text-4xl sm:mt-12 sm:mb-8">
                    Tria la teva fruita preferida!
                </h1>
            </header>
            <div className="grid grid-cols-4 gap-4 px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🍍<div className="pt-1 text-xs">CUP-G</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🍋<div className="pt-1 text-xs">ERC</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🍈<div className="pt-1 text-xs">JxCAT</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🌹<div className="pt-1 text-xs">PSC</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🍊<div className="pt-1 text-xs">Cs</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🍆<div className="pt-1 text-xs">ECP</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    💧<div className="pt-1 text-xs">PPC</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🥑<div className="pt-1 text-xs">PDeCAT</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🥦<div className="pt-1 text-xs">Vox</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🍏<div className="pt-1 text-xs">PNC</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🍌<div className="pt-1 text-xs">Primàries</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🧊<div className="pt-1 text-xs">FNC</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🌶<div className="pt-1 text-xs">PCTC</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🍅<div className="pt-1 text-xs">IZQP</div>
                </button>
                <button onClick={Confirm} className="px-4 py-4 text-3xl shadow bg-translucent">
                    🍉<div className="pt-1 text-xs">RECORTES CERO-GV-M</div>
                </button>
            </div>
        </Layout>
    );
};

export default withRouter(ProcessPage);
