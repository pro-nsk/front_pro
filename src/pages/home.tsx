import * as React from 'react'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {api, Post} from '../api/api'
import Menu from '../components/menu'
import PostComponent from '../components/post'
import AppProps from '../util/appProps'
import {backToTop, isAuthenticated, SITE_NAME} from '../util/util'
import Loading from './loading'
import './style.css'

const PAGE_SIZE = 10

class Posts extends Component<AppProps> {

    state = {
        posts: [],
        menu: [],
        pageNumber: 0,
        ready: false
    }

    componentDidMount() {
        document.title = SITE_NAME
        this.loadData()
    }

    async loadData() {
        let posts = await api.home(this.state.pageNumber)
        let ready = true
        this.setState({posts, ready})
    }

    renderFeed() {
        let posts: Post[] = this.state.posts
        return posts.map(post => <PostComponent key={post._id} post={post} deletePost={this.deletePost} strip more/>)
    }

    next = () => {
        this.loadPage(this.state.pageNumber + 1)
        backToTop()
    }

    prev = () => {
        this.loadPage(this.state.pageNumber - 1)
        backToTop()
    }

    resetHome() {
        this.loadPage(0)
        backToTop()
    }

    isFirst() {
        return this.state.pageNumber == 0
    }

    isLast() {
        return this.state.posts.length < PAGE_SIZE
    }

    loadPage(pageNumber: number) {
        this.setState({pageNumber, ready: false}, () => this.loadData())
    }

    deletePost = async (id) => {
        let ok = await api.delete(id)
        ok && this.loadData()
    }

    render() {
        const auth = isAuthenticated()
        return this.state.ready ? (
            <div className="home">
                <div id="top-bar" className="top-bar">
                    <Menu gotoFunc={url => this.props.history.push(url)} />
                    {auth && <Link className="create" to="/create" >create</Link>}
                    {auth ?
                        <Link className="auth" to="/logout" >logout</Link> :
                        <Link className="auth" to="/login" >login</Link>
                    }
                </div>
                <img className="logo" src={'/images/logo.png'} alt="" onClick={() => this.loadPage(0)} />
                <div className="post-list">
                    {this.renderFeed()}
                </div>
                <div className="bottom-bar">
                    {!this.isFirst() && <div className="prev" onClick={this.prev}>prev</div>}
                    {!this.isLast() && <div className="next" onClick={this.next}>next</div>}
                </div>
                <div className="copyright">© <div onClick={() => this.resetHome()} ><img id="copyright-logo" src={'/images/logo.png'} alt="" />pro nsk</div>, 2011. Материалы сайта защищены авторским правом. При копировании обратная ссылка обязательна.</div>
                <a className="twitter" href="https://twitter.com/pro_nsk"><img src={'/images/twitter.svg'} alt="" /></a>
            </div>
        ) : <Loading />
    }
}

export default Posts