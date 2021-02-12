import PoweredByVocdoni from '../../../components/powered_by';

const Container = ({ children }) => {
    return <div className="flex flex-col flex-1 px-20 my-10 bg-white shadow-2xl rounded-xl">
        <div className="flex flex-col flex-1">
            <h1 className="mb-3 text-lg font-bold text-center text-vocdoni mt-7 lg:text-xl">Sondeig electoral per Internet 14Fruites</h1>
            {children}
        </div>
        <footer className="flex py-10">
            <PoweredByVocdoni className="mx-auto" />
        </footer>
    </div>
};

export default Container;
