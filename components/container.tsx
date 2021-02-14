import PoweredByVocdoni from "./powered_by";

const Container = ({ children }) => {
    return (
        <div className="flex flex-col flex-1 px-6 my-10 bg-white shadow-2xl lg:px-20 rounded-xl">
            <div className="flex flex-col flex-1">
                <h1 className="font-bold text-center text-md lg:mb-3 text-vocdoni mt-7 lg:text-xl">
                    Sondeig electoral per Internet 14Fruites
                </h1>
                {children}
            </div>
            <footer className="flex py-10">
                <PoweredByVocdoni className="mx-auto" />
            </footer>
        </div>
    );
};

export default Container;
