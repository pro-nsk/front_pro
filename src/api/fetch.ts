import * as isofetch from 'isomorphic-fetch'
import {StorageKey} from '../util/storage'

export function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {

    init = init || {}
    init = {
        ...init,
        credentials: 'include',
        headers: {
            ...init.headers
        }
    }

    if (init.body && !(init.headers && init.headers['Content-Type'])) {
        init = {
            ...init,
            headers: {
                ...init.headers,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    }

    return isofetch(input, init).then((resp: Response) => {
        if (resp.ok) {
            return Promise.resolve(resp)
        }
        if (resp && resp.status === 401) {
            // unauthorized, reset token
            localStorage.removeItem(StorageKey.Authenticated)
            return Promise.reject(resp)
        }
        return Promise.reject(resp)
    }).catch((resp: Response) => {
        return Promise.reject(resp)
    })
}

export function processError(err?: any): Promise<any> {
    let resp = err as Response
    let parsedError = undefined
    if (typeof (resp.json) == 'function') {
        return resp.json().catch(() => {
            return Promise.reject(undefined)
        }).then(function (json) {
            parsedError = json
            return Promise.reject(parsedError)
        })
    } else if (resp['response'] && resp['response'].data) {
        parsedError = resp['response'].data
    }
    return Promise.reject(parsedError)
}