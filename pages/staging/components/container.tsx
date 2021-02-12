import PoweredByVocdoni from '../../../components/powered_by';

const Container = ({ children }) => {
    return <div className="flex flex-col flex-1 px-20 my-10 bg-white shadow-2xl rounded-xl">
        <div className="flex-1">
            {children}
        </div>
        <footer className="flex py-10">
            <PoweredByVocdoni className="mx-auto" />
        </footer>
    </div>
};

export default Container;
