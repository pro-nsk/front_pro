import {useEffect} from 'react'
import {api} from '../api/api'
import AppProps from '../util/appProps'

const Logout = (props: AppProps) => {

    const logout = async () => {
        await api.logout()
        props.history.push('/')
    }

    useEffect(() => {
        logout()
    }, [])

    return null
}

export default Logout