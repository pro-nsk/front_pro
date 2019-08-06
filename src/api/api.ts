import { BaseApi, configuration } from './base/BaseApi';
import { processError } from './fetch';
import {StorageKey} from '../util/Storage';

export interface Post {
    url: string;
}

class PostApi extends BaseApi {

    posts(): Promise<any> {

        const options: RequestInit = {
            method: 'GET'
        };

        return this.fetch(configuration.basePath + '/post', options)
            .then(async (response) => {
                let json = await response.json();
                return Promise.resolve(json);
            })
            .catch(() => {
                return [];
            });
    }

    async create(post: Post): Promise<boolean> {

        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(post)
        };

        try {
            let response = await this.fetch(configuration.basePath + '/post', options);
            if (response) {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        } catch (e) {
            return processError(e);
        }
    }

    async login(email: string, password: string): Promise<boolean> {

        const form = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);

        const options: RequestInit = {
            method: 'POST',
            body: form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        try {
            await this.fetch(configuration.basePath + '/login', options);
            localStorage.setItem(StorageKey.Authenticated, 'true');
            return Promise.resolve(true);
        } catch (err) {
            return processError(err);
        }
    }

    logout(): Promise<boolean> {

        const options: RequestInit = {method: 'GET'};

        return this.fetch(configuration.basePath + '/providers/logout', options)
            .then(() => {
                localStorage.removeItem(StorageKey.Authenticated);
                return Promise.resolve(true);
            })
            .catch(() => {
                return Promise.resolve(false);
            });
    }
}

export const postApi = new PostApi();
