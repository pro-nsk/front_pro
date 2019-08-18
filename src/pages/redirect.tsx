import * as React from 'react'
import AppProps from '../util/appProps'

const existingPostMap = {
    171680485423: '/bike-zima'
}

class Redirect extends React.Component<AppProps> {
    componentDidMount() {
        const id = this.props.match.params.id as number

        let newUrl = existingPostMap[id]
        if (newUrl) {
            this.props.history.push(newUrl)
        } else {
            window.location.href = 'https://blog.pro.nsk.ru/post/' + id
        }
    }

    render() {
        return null
    }

}

export default Redirect