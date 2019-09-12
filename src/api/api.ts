import {BaseApi, configuration} from './base/baseApi'
import {processError} from './fetch'
import {StorageKey} from '../util/storage'

export interface Post {
    _id?: string
    urlName?: string
    imageUrl: string
    text?: string
}

class Api extends BaseApi {

    async home(page: number): Promise<any> {
        return this.sendRequest('/home/' + page)
    }

    async menu(): Promise<any> {
        return this.sendRequest('/menu')
    }

    async post(id: string): Promise<Post> {
        return this.sendRequest('/post/' + id)
    }

    async postByUrlName(urlName: string): Promise<Post> {
        return this.sendRequest('/' + urlName)
    }

    async create(post: Post): Promise<boolean> {

        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(post)
        }

        try {
            let response = await this.fetch(configuration.basePath + '/post', options)
            if (response) {
                return Promise.resolve(true)
            } else {
                return Promise.resolve(false)
            }
        } catch (e) {
            return processError(e)
        }
    }

    async edit(id: string, post: Post): Promise<boolean> {

        const options: RequestInit = {
            method: 'PUT',
            body: JSON.stringify(post)
        }

        try {
            let response = await this.fetch(configuration.basePath + '/post/' + id, options)
            if (response) {
                return Promise.resolve(true)
            } else {
                return Promise.resolve(false)
            }
        } catch (e) {
            return processError(e)
        }
    }

    async login(email: string, password: string): Promise<boolean> {

        const form = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password)

        const options: RequestInit = {
            method: 'POST',
            body: form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        try {
            await this.fetch(configuration.basePath + '/login', options)
            localStorage.setItem(StorageKey.Authenticated, 'true')
            return Promise.resolve(true)
        } catch (err) {
            return processError(err)
        }
    }

    async register(email: string, password: string, confirmPassword: string): Promise<boolean> {

        const form = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password) + '&confirmPassword=' + encodeURIComponent(confirmPassword)

        const options: RequestInit = {
            method: 'POST',
            body: form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        try {
            await this.fetch(configuration.basePath + '/register', options)
            localStorage.setItem(StorageKey.Authenticated, 'true')
            return Promise.resolve(true)
        } catch (err) {
            return processError(err)
        }
    }

    async logout(): Promise<boolean> {
        try {
            await this.fetch(configuration.basePath + '/logout', {method: 'GET'})
            localStorage.removeItem(StorageKey.Authenticated)
            return Promise.resolve(true)
        } catch (e) {
            return Promise.resolve(false)
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.fetch(configuration.basePath + '/post/' + id, {method: 'DELETE'})
            return Promise.resolve(true)
        } catch (error) {
            return processError(error)
        }
    }

    private async sendRequest(url: string): Promise<any> {
        try {
            let response = await this.fetch(configuration.basePath + url, {method: 'GET'})
            let json = await response.json()
            return Promise.resolve(json)
        } catch (error) {
            return processError(error)
        }
    }
}

export const api = new Api()