import { GatewayPool, VotingApi } from "dvote-js"
import { ProcessInfo } from "./types"


// VOCDONI API's

export async function getProcessInfo(processId: string, pool: GatewayPool): Promise<ProcessInfo> {
    const results = await Promise.all([
        VotingApi.getProcessMetadata(processId, pool),
        VotingApi.getProcessParameters(processId, pool)
    ])

    return {
        metadata: results[0],
        parameters: results[1],
        id: processId, // pass-through to have the value for links
        entityAddress: results[1].entityAddress.toLowerCase()
    }
}

export async function getProcessList(entityAddress: string, pool: GatewayPool): Promise<string[]> {
    let result: string[] = []
    let lastId: string = undefined

    while (true) {
        const processList = await VotingApi.getProcessList(entityAddress, pool, lastId)
        if (processList.length == 0) return result

        result = result.concat(processList.map(id => "0x" + id))
        lastId = processList[processList.length - 1]
    }
}
