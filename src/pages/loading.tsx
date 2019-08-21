import * as React from 'react'
import AppProps from '../util/appProps'

class Loading extends React.Component<AppProps> {
    render() {
        return (
            <div className='loading'>
                <img src={'/images/logo.png'} id="heart" />
            </div>
        )
    }
}

export default Loading