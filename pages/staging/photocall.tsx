import Layout from "../../components/layout";
import PoweredByVocdoni from "../../components/powered_by";

const Photocall = () => {
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
};

export default Photocall;
