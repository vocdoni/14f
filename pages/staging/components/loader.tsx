import Container from "./container";

export const Spinner = () => {
    return <span className="animate-spin">♻️</span>;
};

const Loader = () => {
    return (
        <Container>
            <div className="my-auto text-lg font-bold text-center text-gray-900">
                <Spinner />
                &nbsp; Carregant...
            </div>
        </Container>
    );
};

export default Loader;
