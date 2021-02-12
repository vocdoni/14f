export const Spinner = () => {
    return <span className="animate-spin">♻️</span>
}

const Loader = () =>  {
    return <div className="flex justify-center flex-1 align-middle">
        <h1 className="my-auto text-lg font-bold text-gray-900">
            <Spinner />
            &nbsp; Carregant...
        </h1>
    </div>
}

export default Loader;
