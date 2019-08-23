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

export function stripHtml(html) {
    var tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    return tempDiv.textContent || tempDiv.innerText || ''
}

export function backToTop() {
    let navBar = document.getElementById('top-bar')
    navBar && navBar.scrollIntoView()
}