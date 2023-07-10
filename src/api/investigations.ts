import { Investigation } from '../types/Investigations'
import { Summary } from '../types/Summary'
import { BaseClient } from './baseClient'

class Api extends BaseClient {
    constructor() {
        super(
            new Headers({
                'Content-type': 'application/json'
            }),
            process.env.REACT_APP_INVESTIGATIONS_API as string
        )
    }

    uploadDocument = async (id: string, file: File) => {
        const body = new FormData()
        body.append('document', file)

        const { response } = await this.api('upload', id, 'PUT', body)
        return response
    }

    summarize = async (id: string): Promise<Summary | undefined> => {
        const { json } = await this.api<Summary>('summarize', id, 'GET')
        return json
    }

    create = async (): Promise<Investigation> => {
        const { json } = await this.api<Investigation>(
            'create',
            undefined,
            'POST'
        )
        return json as Investigation
    }
}

//Singleton pattern
export const investigationsApi = new Api();