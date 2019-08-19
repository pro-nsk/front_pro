import {StorageKey} from './storage'

export function isAuthenticated() {
    if (localStorage.getItem(StorageKey.Authenticated) === 'true') {
        return true
    }
    return false
}

export function isEnter(e) {
    if (e.key == 'Enter') {
        return true
    }
    return false
}

export const SITE_NAME = 'motors - novosibirsk+'