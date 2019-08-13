import {env}           from '../../env'
import {fetch}         from '../fetch'
import {Configuration} from './configuration'

export const configuration: Configuration = {
    basePath: env.endpoint
}

export abstract class BaseApi {
    protected fetch = fetch;
}