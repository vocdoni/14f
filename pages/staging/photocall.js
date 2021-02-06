import Layout from "../../components/layout";
import PoweredByVocdoni from "../../components/powered_by";

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
                <div className="grid grid-cols-1 mx-auto my-auto">
                    <img src="/logo_14F_alpha.png" className="mx-auto mb-4" />
                    <div className="mx-auto">
                        <PoweredByVocdoni />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
