import { Investigation } from '../types/Investigations'
import { Summary } from '../types/Summary'
import { BaseClient } from './baseClient'

class Api extends BaseClient {
    constructor() {
        super(
            new Headers({
                'Content-type': 'application/json',
            }),
            process.env.REACT_APP_INVESTIGATIONS_API as string
        )
    }

    list = async (): Promise<Investigation[]> => {
        const { json } = await this.api<Investigation[]>(
            undefined,
            undefined,
            'GET'
        )
        return json ?? []
    }

    summarize = async (id: string, files: File[]) => {
        const body = new FormData()

        for (let file in files) body.append('documents', file)

        const { response } = await this.api('upload', id, 'PUT', body)
        return response
    }

    getSummary = async (id: string): Promise<Summary | undefined> => {
        const { json } = await this.api<Summary>('summarize', id, 'GET')

        return json
    }

    create = async (): Promise<Investigation> => {
        const { json } = await this.api<Investigation>('', undefined, 'POST')
        return json as Investigation
    }

    updateTitle = async (id: string, title: string): Promise<Investigation> => {
        const { json } = await this.api<Investigation>(undefined, id, 'PATCH', {
            title
        });
        
        return json as Investigation
    }
}

//Singleton pattern
export const investigationsApi = new Api()
