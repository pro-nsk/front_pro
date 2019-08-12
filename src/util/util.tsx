import {StorageKey} from './storage1';

export function isAuthenticated() {
    if (localStorage.getItem(StorageKey.Authenticated) === 'true') {
        return true;
    }
    return false;
}

export function isEnter(e) {
    if (e.key == 'Enter') {
        return true;
    }
    return false;
}