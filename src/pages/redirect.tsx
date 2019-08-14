import * as React from 'react'
import AppProps from '../util/appProps'

class Redirect extends React.Component<AppProps> {
    componentDidMount() {
        const id = this.props.match.params.id as number
        window.location.href = 'https://blog.pro.nsk.ru/post/' + id
    }

    render() {
        return null
    }

}

export default Redirect