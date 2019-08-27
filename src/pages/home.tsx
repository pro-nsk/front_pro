import * as React from 'react'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './style.css'
import AppProps from '../util/appProps'
import {Post, api} from '../api/api'
import {isAuthenticated, SITE_NAME, stripHtml, backToTop} from '../util/util'
import Loading from './loading'

const pageSize = 10

class Posts extends Component<AppProps> {

    state = {
        posts: [],
        pageNumber: 0,
        ready: false
    }

    componentDidMount() {
        document.title = SITE_NAME
        document.onclick = this.clickHandler
        document.ontouchstart = this.clickHandler
        this.loadData()
    }

    async loadData() {
        let posts = await api.posts()
        let ready = true
        this.setState({posts, ready})
    }

    renderFeed(auth: boolean) {
        let posts: Post[] = this.state.posts
        return posts.map(post => {
            return (
                <div className="post" key={post._id}>
                    <a href={post.imageUrl}><img key={post._id} src={post.imageUrl} /></a>
                    {post.text && <div className="text">
                        {stripHtml(post.text)}
                        {post.urlName && post.text.length > 200 && <Link className="view" to={`/${post.urlName}`} >more</Link>}
                    </div>}
                    <div className="control">
                        {post.urlName && <Link className="view" to={`/${post.urlName}`} >link</Link>}
                        {auth && <div className="delete" onClick={() => this.deletePost(post._id)}>delete</div>}
                        {auth && <Link className="edit" to={`/edit/${post._id}`} >edit</Link>}
                    </div>
                </div>
            )
        }).slice(this.state.pageNumber * pageSize, (this.state.pageNumber * pageSize) + pageSize)
    }

    next = () => {
        this.setState({pageNumber: this.state.pageNumber + 1})
        backToTop()
    }

    prev = () => {
        this.setState({pageNumber: this.state.pageNumber - 1})
        backToTop()
    }

    resetHome() {
        this.setState({pageNumber: 0})
        backToTop()
    }

    isFirst() {
        return this.state.pageNumber == 0
    }

    isLast() {
        let gg = this.state.posts.length / pageSize
        console.log(gg)
        return (this.state.posts.length / pageSize) <= (this.state.pageNumber + 1)
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
        let posts: Post[] = this.state.posts
        return posts.filter(post => post.urlName != undefined).map(post => {
            return (
                <li key={post.urlName}><Link to={'/' + post.urlName} >{'/' + post.urlName}</Link></li>
            )
        })
    }

    async deletePost(id) {
        let ok = await api.delete(id)
        ok && this.loadData()
    }

    render() {
        const auth = isAuthenticated()
        return this.state.ready ? (
            <div className="home">
                <div id="top-bar" className="top-bar">
                    <div id="menu">menu
                        <ul id='post-list'>{this.renderMenu()}</ul>
                    </div>
                    {auth && <Link className="create" to="/create" >create</Link>}
                    {auth ?
                        <Link className="auth" to="/logout" >logout</Link> :
                        <Link className="auth" to="/login" >login</Link>
                    }
                </div>
                <img className="logo" src={'/images/logo.png'} alt="" onClick={() => this.setState({pageNumber: 0})} />
                <div className="post-list">
                    {this.renderFeed(auth)}
                </div>
                <div className="bottom-bar">
                    {!this.isFirst() && <div className="prev" onClick={this.prev}>prev</div>}
                    {!this.isLast() && <div className="next" onClick={this.next}>next</div>}
                </div>
                <div className="copyright">© <div onClick={() => this.resetHome()} ><img id="copyright-logo" src={'/images/logo.png'} alt=""/>pro nsk</div>, 2011. Материалы сайта защищены авторским правом. При копировании обратная ссылка обязательна.</div>
                <a className="li" href="//www.liveinternet.ru/click"><img src="//counter.yadro.ru/logo?17.5" title="LiveInternet: показано число просмотров за 24 часа, посетителей за 24 часа и за сегодня" alt="" /></a>
                {/* <img className='ya' src="https://informer.yandex.ru/informer/52259428/3_0_999999FF_999999FF_0_pageviews"  alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"/> */}
                <a className="twitter" href="https://twitter.com/pro_nsk"><img src={'/images/twitter.png'} alt="" /></a>
            </div>
        ) : <Loading />
    }
}

export default Posts