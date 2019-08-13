export enum StorageKey {
    Authenticated = 'Authenticated'
}

export interface StorageReader {
    read: (key: StorageKey) => any
}

export interface StorageWriter {
    write: (key: StorageKey, value: any) => any
}

export function storageReaderFactory(prefix: string): StorageReader {
    return {
        read: (key: StorageKey) => {
            let value = localStorage.getItem(prefix + key)
            return value ? JSON.parse(value) : {}
        }
    }
}

export function storageWriterFactory(prefix: string): StorageWriter {
    return {
        write: (key: StorageKey, value: any) => {
            let res
            if (value) {
                let old = localStorage.getItem(prefix + key)
                if (old) {
                    let oldVal = JSON.parse(old)
                    if (typeof oldVal === 'object') {
                        res = {...oldVal, ...value}
                        localStorage.setItem(prefix + key, JSON.stringify(res))
                    } else {
                        res = oldVal + value
                        localStorage.setItem(prefix + key, JSON.stringify(res))
                    }
                } else {
                    res = value
                    localStorage.setItem(prefix + key, JSON.stringify(res))
                }
            }
            return res
        }
    }
}