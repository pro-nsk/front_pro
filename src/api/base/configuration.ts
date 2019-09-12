export interface ConfigurationParameters {
    basePath?: string
}

export class Configuration {
    
    basePath?: string

    constructor(param: ConfigurationParameters = {}) {
        this.basePath = param.basePath
    }
}