import * as React from 'react'
import {Component} from 'react'
import {api, Post} from '../api/api'
import AppProps from '../util/appProps'
import '../pages/style.css'

interface MenuProps {
    gotoFunc: (url) => void
}

class Menu extends Component<AppProps & MenuProps> {

    state = {
        menu: []
    }

    componentDidMount() {
        document.onclick = this.clickHandler
        document.ontouchstart = this.clickHandler
    }

    async loadMenu() {
        let menu = await api.menu()
        this.setState({menu})
    }

    clickHandler = e => {
        let menu = document.getElementById('menu-t')
        let list = document.getElementById('menu-p-list')
        if (list) {
            list.className = e.target == menu || e.target.parentElement == list ? 'm-list-visible' : 'm-list-hidden'
        }
    }

    renderMenu() {
        let menu: Post[] = this.state.menu
        return menu.length > 0 ?
            menu.map(post => {
                return (
                    <li key={post.urlName} onClick={() => this.props.gotoFunc(post.urlName)}>{'/' + post.urlName}</li>
                )
            }) :
            <li>...</li>
    }

    render() {
        return (
            <div id="menu">
                <span id="menu-t" onClick={() => this.loadMenu()}>menu</span>
                <ul id='menu-p-list' className='m-list-hidden'>{this.renderMenu()}</ul>
            </div>
        )
    }
}

export default Menu