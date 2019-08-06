import {StorageKey} from './Storage';

export function isAuthenticated() {
    if (localStorage.getItem(StorageKey.Authenticated) === 'true') {
        return true;
    }
    return false;
}