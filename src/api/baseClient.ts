import { ResponseCodesFactory } from '../factories'
import { sanitizeApiEndpoint } from '../utils/stringSanitizer'
export abstract class BaseClient {
    protected readonly _apiEndpoint: string
    private readonly _headers: Headers

    constructor(defaultRequestHeaders: Headers, apiEndpoint: string) {
        this._apiEndpoint = apiEndpoint
        this._headers = defaultRequestHeaders
    }

    protected api = <T>(
        controller?: string,
        id?: string,
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        body?: any,
        queryParams?: string,
        headers?: { key: string; value: string }[]
    ) => {
        const sanitizedUrl = sanitizeApiEndpoint(
            this._apiEndpoint,
            controller,
            id,
            queryParams
        )

        let _body = body ? JSON.stringify(body) : undefined
        if (controller === 'upload') {
            _body = body
            this._headers.delete('Content-type')
        }

        if (headers)
            headers.forEach((h) => this._headers.append(h.key, h.value ?? ''))

        return fetch(sanitizedUrl, {
            credentials: 'include',
            method: method ?? 'GET',
            body: _body,
            headers: this._headers,
        }).then((r) => this.handleResponse<T>(r))
    }

    protected handleResponse = async <T>(
        response: Response
    ): Promise<{ response: Response; json?: T; headers: Headers }> => {
        if (!response.ok)
            throw Error(ResponseCodesFactory.create(response.status))

        const contentType = response.headers.get('content-type')
        if (!contentType)
            return { response: response, headers: response.headers }

        const isJsonContent =
            contentType.indexOf('application/json') !== -1 ||
            contentType.indexOf('application/hal+json') !== -1

        if (contentType && isJsonContent) {
            return {
                json: await response.json(),
                headers: response.headers,
                response: response,
            }
        }

        return {
            response: response,
            headers: response.headers,
        }
    }
}
