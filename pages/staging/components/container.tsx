const Container = ({ children }) => {
    return <div className="flex flex-col flex-1 m-4 bg-red-200 shadow-2xl">
        {children}
    </div>
};

export default Container;
