const StatisticsForm = ({ onCodeUpdate, onResidencyUpdate }) => {
    return (
        <div className="mb-6 text-xs text-gray-600 lg:text-sm">
            <p className="mb-2">
                Abans de triar, i de forma voluntària, pots respondre aquestes
                preguntes. Recollim aquestes dades només amb finalitats
                estadístiques i no estan vinculades al teu vot.
            </p>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-4">
                <div className="col-auto">
                    <label htmlFor="postal-code" className="font-bold">
                        Codi postal
                    </label>
                    <input
                        id="postal-code"
                        type="text"
                        placeholder="00000"
                        onChange={(e) => onCodeUpdate(e.currentTarget.value)}
                        className="w-full mt-1 text-gray-700 border-b border-gray-500 rounded focus:outline-none"
                    ></input>
                </div>
                <div className="col-span-3">
                    <div className="my-auto">
                        <p className="font-bold">Sóc resident a</p>
                        <div className="grid grid-cols-1 mt-1 lg:block">
                            <div className="lg:inline">
                                <input
                                    id="dni"
                                    type="radio"
                                    name="residency"
                                    className="mr-1"
                                    value="dni"
                                    onChange={(e) =>
                                        onResidencyUpdate(e.currentTarget.value)
                                    }
                                />
                                <label htmlFor="dni">Catalunya</label>
                            </div>
                            <div className="lg:inline">
                                <input
                                    id="nie"
                                    type="radio"
                                    className="mr-1 lg:ml-3"
                                    name="residency"
                                    value="nie"
                                    onChange={(e) =>
                                        onResidencyUpdate(e.currentTarget.value)
                                    }
                                />
                                <label htmlFor="nie">Cat. amb NIE</label>
                            </div>
                            <div className="lg:inline">
                                <input
                                    id="foreign"
                                    type="radio"
                                    className="mr-1 lg:ml-3"
                                    name="residency"
                                    value="foreign"
                                    onChange={(e) =>
                                        onResidencyUpdate(e.currentTarget.value)
                                    }
                                />
                                <label htmlFor="foreign">l'estranger</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsForm;
