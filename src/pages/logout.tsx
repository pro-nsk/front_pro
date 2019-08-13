import * as React from 'react'
import {api} from '../api/api'
import AppProps from '../util/appProps'

class Logout extends React.Component<AppProps> {
    async componentDidMount() {
        await api.logout()
        this.props.history.push('/')
    }

    render() {
        return null
    }
}

export default Logout