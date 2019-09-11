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
        let menu = document.getElementById('menu')
        let list = document.getElementById('post-list')
        if (e.target == menu) {
            if (list) {
                list.style.visibility = 'visible'
                list.style.opacity = '1'
            }
        } else {
            if (list) {
                list.style.visibility = 'hidden'
                list.style.opacity = '0'
            }
        }
    }

    renderMenu() {
        let menu: Post[] = this.state.menu
        return menu.map(post => {
            return (
                <li key={post.urlName} onClick={() => this.props.gotoFunc(post.urlName)}>{'/' + post.urlName}</li>
            )
        })
    }

    render() {
        return (
            <div id="menu" onClick={() => this.loadMenu()}>menu
                <ul id='post-list'>{this.renderMenu()}</ul>
            </div>
        )
    }
}

export default Menu