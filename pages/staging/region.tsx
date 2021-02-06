import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/layout";

const RegionSelectorPage = () => {
    return (
        <Layout>
            <header>
                <h1 className="mt-8 mb-6 text-lg font-bold leading-none tracking-tight text-center text-gray-900 sm:text-3xl lg:text-4xl sm:mt-12 sm:mb-8">
                    Abans, quina és la teva província?
                </h1>
            </header>
            <div className="grid grid-cols-2 gap-4 px-4 text-2xl sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
                <Link href="/staging/process">
                    <button className="px-4 py-4 font-semibold transition-colors duration-200 shadow bg-translucent hover:bg-gray-100 rounded-xl">
                        Barcelona
                    </button>
                </Link>
                <Link href="/staging/process">
                    <button className="px-4 py-4 font-semibold transition-colors duration-200 shadow bg-translucent hover:bg-gray-100 rounded-xl">
                        Girona
                    </button>
                </Link>
                <Link href="/staging/process">
                    <button className="px-4 py-4 font-semibold transition-colors duration-200 shadow bg-translucent hover:bg-gray-100 rounded-xl">
                        Lleida
                    </button>
                </Link>
                <Link href="/staging/process">
                    <button className="px-4 py-4 font-semibold transition-colors duration-200 shadow bg-translucent hover:bg-gray-100 rounded-xl">
                        Tarragona
                    </button>
                </Link>
            </div>
        </Layout>
    );
};

export default withRouter(RegionSelectorPage);
