import * as React from 'react'
import AppProps from '../util/appProps'

const existingPostMap = {
    171680485423: '/bike-zima',
    176941091103: '/obskoe-shtorm',
    37039693600: '/iskitim-zavod',
    177997321518: '/krasnoyarsk-enisey',
    13598021193: '/zabroshennaja-bolnica',
    77287150104: '/barnaul-khv',
    71387396306: '/obzor-jupiter-3-sony-nex',
    32575407404: '/vertoletnaja-eskadrilja',
    177896057643: '/zolootval-tec5'
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