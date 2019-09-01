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
    177896057643: '/zolootval-tec5',
    167185682693: '/karakol-lakes',
    90967700973: '/polja-za-tec5',
    171780159158: '/voennaja-9-1',
    91912510953: '/shtorm-chaika',
    171116738238: '/krasnoyarsk-2016-den-2',
    181262466133: '/bc-manhetten',
    13420893787: '/ochistnye-sooruzhenija',
    181007759843: '/vechernij-ekb',
    163979833023: '/berdskie-skaly',
    95899344453: '/300-let-sosna',
    6252231070: '/pervaja-plenka-fed',
    101064056203: '/prosrochka-fed-3',
    163256022028: '/minolta-a-sweet-2',
    165753600643: '/plenka-fed-2'
}

class Redirect extends React.Component<AppProps> {
    componentDidMount() {
        const id = this.props.match.params.id as number

        let newUrl = existingPostMap[id]
        if (newUrl) {
            this.props.history.push(newUrl)
        } else {
            this.props.history.push('/not-found')
        }
    }

    render() {
        return null
    }

}

export default Redirect