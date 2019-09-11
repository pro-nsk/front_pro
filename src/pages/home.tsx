import * as React from 'react'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './style.css'
import AppProps from '../util/appProps'
import {Post, api} from '../api/api'
import {isAuthenticated, SITE_NAME, stripHtml, backToTop} from '../util/util'
import Loading from './loading'
import Menu from '../components/menu'

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
        })
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
        this.setState({pageNumber}, () => this.loadData())
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
                    <Menu gotoFunc={url => this.props.history.push(url)}/>
                    {auth && <Link className="create" to="/create" >create</Link>}
                    {auth ?
                        <Link className="auth" to="/logout" >logout</Link> :
                        <Link className="auth" to="/login" >login</Link>
                    }
                </div>
                <img className="logo" src={'/images/logo.png'} alt="" onClick={() => this.loadPage(0)} />
                <div className="post-list">
                    {this.renderFeed(auth)}
                </div>
                <div className="bottom-bar">
                    {!this.isFirst() && <div className="prev" onClick={this.prev}>prev</div>}
                    {!this.isLast() && <div className="next" onClick={this.next}>next</div>}
                </div>
                <div className="copyright">© <div onClick={() => this.resetHome()} ><img id="copyright-logo" src={'/images/logo.png'} alt=""/>pro nsk</div>, 2011. Материалы сайта защищены авторским правом. При копировании обратная ссылка обязательна.</div>
                <a className="twitter" href="https://twitter.com/pro_nsk"><img src={'/images/twitter.svg'} alt="" /></a>
            </div>
        ) : <Loading />
    }
}

export default Posts