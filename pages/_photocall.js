import Layout from "../components/layout";
import PoweredByVocdoni from "../components/powered_by";

function Name() {
    return (
        <>
            <span style={{ color: "#6A759E" }}>14F</span>ruites
        </>
    );
}

export default function Home() {
    return (
        <Layout>
            <div className="flex h-screen">
              <div className="grid grid-cols-1 my-auto">
                <h1 className="mx-auto font-extrabold leading-none tracking-tight text-gray-900 sm:text-6xl lg:text-6xl">
                    <Name />
                </h1>
                <div className="mx-auto mt-2">
                  <PoweredByVocdoni />
                </div>
              </div>
            </div>
        </Layout>
    );
}
