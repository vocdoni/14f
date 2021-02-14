import React, { Component, useEffect, useState } from "react";
import { DigestedProcessResultItem, GatewayPool, VotingApi } from "dvote-js";
import Highcharts from "highcharts";
import HighchartsExporting from 'highcharts/modules/exporting'
import ItemSeries from "highcharts/modules/item-series";
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
    ItemSeries(Highcharts)
}

import { usePool, UsePoolContext } from "@vocdoni/react-hooks";
import { BigNumber } from "ethers";
import Loader from "../components/loader";
import Layout from "../components/layout";

type AggregatedResults = {
    [key: string]: DigestedProcessResultItem
}


const ucFirst = (str: string) => {
    str += ''
    const f = str.charAt(0)
        .toUpperCase()
    return f + str.substr(1)
}

const colors = {
    psc: '#B12518',
    erc: '#F4C564',
    pp: '#55B1E3',
    pdecat: '#0081C2',
    cup: '#FCF162',
    jxcat: '#10BFB2',
    cs: '#EA7E3F',
    ecp: '#984AAF',
    vox: '#79C44D',
    pctc: '#E3061A',
    izqp: '#823147',
    mpic: '#414347',
    pnc: '#40BCC8',
    fnc: '#00A3F1',
    rc: '#020202',
    pumj: '#4abced',
    uep: '#012B98',
    acv: '#FFED00',
    eb: '#ddddd7',
    scat: '#F8EA1F',
    ebre: '#2E3192',
    unidos: '#8B0000',
    mcr: '#DC361D',
    blank: '#ffffff',
    void: '#7f5e00',
}

const seats = {
    barcelona: 85,
    girona: 17,
    lleida: 15,
    tarragona: 18,
}

const { OPTIONS } = process.env

const cutDhondt = (votes) => {
    const total : number = Object.values(votes).reduce((a: number, b: number) => a + b, 0) as unknown as number
    const threshold : number = total * 0.03
    const cut = {}

    for (const party in votes) {
        if (party === 'void' || party === 'blank') {
            continue
        }

        if (votes[party] > threshold) {
            cut[party] = votes[party]
        }
    }

    return cut
}

const dhondtTotal = (votes: AggregatedDhondt) => {
    let total = 0
    Object.values(votes).forEach((regionVotes: DhondtResults[]) => {
        total += Object.values(regionVotes).map((a) => a.votes).reduce((a: number, b: number) => a + b, 0)
    })
    return total
}

const dhondtTotalParty = (votes: AggregatedDhondt, party2count : string) => {
    let total = 0
    Object.values(votes).forEach((regionVotes) => {
        const blank = regionVotes.find(({party}) => party === party2count)
        total += blank.votes
    })
    return total
}

const dhondt = (seats, votes) => {
    const list : DhondtResults[] = Object.getOwnPropertyNames(votes).map((party) => {
        return {party, votes: votes[party], seats: 0};
    });
    for (let i = 0; i < seats; i++) {
        list.sort((p1, p2) => {
            const v1 = p1.votes / (p1.seats + 1);
            const v2 = p2.votes / (p2.seats + 1);
            return v2 - v1;
        });
        list[0].seats += 1;
    }
    list.sort((p1, p2) => p2.votes - p1.votes);
    return list;
};

type DhondtResults = {
    party: string,
    votes: number,
    seats: number,
}

type AggregatedDhondt = {
    [key: string]: DhondtResults[]
}

const dhondtExtract = (results: AggregatedResults) : AggregatedDhondt => {
    const data = {}
    if (!Object.keys(results).length) {
        return data
    }

    Object.keys(results).forEach((region) => {
        const result = {}
        results[region].voteResults.forEach((res) => {
            result[res.title.default] = res.votes.toNumber()
        })
        data[region] = dhondt(seats[region], cutDhondt(result))
    })

    return data
}

const uncutDhondtExtract = (results: AggregatedResults) : AggregatedDhondt => {
    const data = {}
    if (!Object.keys(results).length) {
        return data
    }

    Object.keys(results).forEach((region) => {
        const result = {}
        results[region].voteResults.forEach((res) => {
            result[res.title.default] = res.votes.toNumber()
        })
        data[region] = dhondt(seats[region], result)
    })

    return data
}

const sumDhondt = (data: AggregatedDhondt) => {
    const sum = {}
    Object.values(data).forEach((region) => {
        region.forEach((val: DhondtResults) => {
            if (!sum[val.party]) {
                sum[val.party] = {
                    votes: val.votes,
                    seats: val.seats,
                }
                return
            }
            sum[val.party] = {
                votes: sum[val.party].votes + val.votes,
                seats: sum[val.party].seats + val.seats,
            }
        })
    })
    return sum
}

const dhondt2Chart = (data: AggregatedDhondt) => {
    const results = []
    if (!Object.values(data).length) {
        return []
    }

    const sum = sumDhondt(data)

    for (const party in sum) {
        if (['void', 'blank'].includes(party)) {
            continue
        }

        const label = OPTIONS[party]

        results.push([
            `${label.icon} ${OPTIONS[party].full}`,
            sum[party].seats,
            colors[party],
            `${label.icon} ${label.name}`,
        ])
    }

    return results
}

const ResultsPage = () => {
    const {loading, pool} = usePool()
    const [results, setResults] = useState<AggregatedResults>({})

    useEffect(() => {
        if (loading || pool === null) {
            return
        }

        fetch("/process-ids.json?random=" + Math.random().toString().slice(2))
            .then((res) => res.json())
            .then(async (processMap) => {
                const res = {}
                await Promise.all(Object.keys(processMap).map(async (region) => {
                    const processResults = await VotingApi.getResultsDigest(processMap[region], pool)
                    res[region] = processResults.questions.pop()
                }))
                setResults(res)
            })
            .catch((err) => {
                alert("No es poden carregar els detalls de les circumscripcions");
            })
    }, [loading])

    const data = dhondtExtract(results)
    const uncut = uncutDhondtExtract(results)
    const regions = Object.keys(results)
    const total = dhondtTotal(uncut)
    const totalBlank = dhondtTotalParty(uncut, 'blank')
    const totalVoid = dhondtTotalParty(uncut, 'void')

    return (
        <Layout>
            <header className="mt-16 mb-8 font-extrabold leading-none tracking-tight text-gray-900">
                <a href="/">
                    <img
                        src="/logo_14F_alpha.png"
                        className="mx-auto lg:mx-0"
                    />
                </a>
            </header>
            <div className="highcharts-figure main-chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        chart: {
                            type: 'item',
                            height: 500,
                        },
                        exporting: {
                            enabled: false,
                        },
                        title: {
                            text: '14Fruites',
                        },

                        subtitle: {
                            text: 'Sondeig d\'Eleccions al Parlament de Catalunya 2021',
                        },

                        legend: {
                            labelFormat: '{name} <span class="">({y} escons)</span>'
                        },

                        series: [{
                            name: 'Escons',
                            keys: ['name', 'y', 'color', 'label'],
                            data: dhondt2Chart(data),
                            dataLabels: {
                                enabled: true,
                                format: '{point.label}'
                            },

                            // Circular options
                            center: ['50%', '88%'],
                            size: '170%',
                            startAngle: -100,
                            endAngle: 100
                        }]
                    }}
                    style={{
                        width: '100%'
                    }}
                />
                <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className="text-center">
                        <strong>Vots totals:</strong> {total}
                    </div>
                    <div className="text-center">
                        <strong>Vots en blanc:</strong> {totalBlank}
                    </div>
                    <div className="text-center">
                        <strong>Vots nuls:</strong> {totalVoid}
                    </div>
                </div>
            </div>
            <div className="region-chart">
                <h2 className="text-2xl mb-1">Resultats per circumscripció (llindar electoral 3%)</h2>
                <TableResults results={data} seats />
                <h2 className="text-2xl mb-1 mt-6">Vots totals per circumscripció</h2>
                <TableResults results={uncut} />
            </div>
            <div className="bg-green-400 p-4 my-6 rounded-md text-white">
                <p className="font-bold">
                    Organitza qualsevol tipus de procés de participació amb Vocdoni.&nbsp;
                    <a href="https://vocdoni.io" target="_blank" className="underline">
                        Fes clic aquí per saber-ne més.
                    </a>
                </p>
                <i>Consultes, assemblees generals, eleccions, pressupostos participatius,...</i>
            </div>
            <div className="text-xs leading-4 text-gray-600">
                <p className="mb-2">
                    Aquest sondeig electrònic està organitzat per Vocdoni i no
                    té vinculació amb les eleccions al Parlament.
                </p>
                <p className="mb-2">
                    El sistema implementa un mecanisme criptogràfic experimental
                    anomenat "signatura cega" que proporciona al participant la
                    possibilitat d'utilitzar certificats tipus idCAT amb el grau
                    d'anonimat necessària per un sondeig d'aquest tipus. No
                    obstant en unes eleccions oficials es requereixen més
                    garanties com les incloses en el full de ruta de la{" "}
                    <a
                        href="https://docs.vocdoni.io/#/architecture/protocol/franchise-proof"
                        target="_blank"
                        className="underline"
                    >
                        plataforma de codi obert Vocdoni
                    </a>
                    .
                </p>
                <p>
                    Per saber-ne més consulta la nota de premsa{" "}
                    <a
                        href="https://www.notion.so/Catalunya-acollir-el-primer-sondeig-per-internet-de-les-eleccions-del-14F-amb-tecnologia-blockchain-699ee7eb98b84a11926b1e1676011d12"
                        target="_blank"
                        className="underline"
                    >
                        aquí
                    </a>{" "}
                    i la informació tècnica sobre la tecnologia de vot digital
                    que ho possibilita{" "}
                    <a
                        href="https://www.notion.so/Info-t-cnica-Votaci-amb-certificat-digital-b222379b80894380b6047036deedef5c"
                        target="_blank"
                        className="underline"
                    >
                        aquí
                    </a>
                    .
                </p>
            </div>
        </Layout>
    );
};

const TableResults = ({results, seats} : {results: AggregatedDhondt, seats?: boolean})  => {
    if (!results || results && !Object.keys(results).length) {
        return <Loader />
    }

    return (
        <>
            {
                Object.keys(results).sort().map((region) => (
                    <RegionResults
                        results={results[region]}
                        region={region}
                        seats={seats}
                        key={region}
                    />
                ))
            }
        </>
    )
}

const RegionResults = ({results, region, seats} : {results: DhondtResults[], region: string, seats?: boolean}) => {
    return (
        <>
            <h3 className="text-xl mb-1 mt-3">{ucFirst(region)}</h3>
            <table className="table-auto min-w-full">
                <thead>
                    <tr className="border-t-2 border-green-600">
                        <th className="text-left">Fruita</th>
                        <th className="text-left">Vots</th>
                        {
                            seats && <th className="text-left">Escons</th>
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    results.map((res: DhondtResults) => (
                        <tr className='border-t' key={res.party}>
                            <td>
                                {`${OPTIONS[res.party].icon} ${OPTIONS[res.party].name} — ${OPTIONS[res.party].full}`}
                            </td>
                            <td>
                                {res.votes}
                            </td>
                            {
                                seats && <td>{res.seats}</td>
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default ResultsPage
