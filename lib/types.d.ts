import { ProcessContractParameters, ProcessMetadata } from "dvote-js"
import { BigNumber } from "ethers"

export type ProcessInfo = {
    id: string,
    metadata: ProcessMetadata,
    parameters: ProcessContractParameters,
    entityAddress: string
}
