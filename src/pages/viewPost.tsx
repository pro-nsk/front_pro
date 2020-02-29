import * as React from 'react'
import {Component} from 'react'
import AppProps from '../util/appProps'
import {api} from '../api/api'
import './style.css'
import {isAuthenticated, SITE_NAME, stripHtml} from '../util/util'
import {Link} from 'react-router-dom'
import Loading from './loading'
import Menu from '../components/menu'
import PostComponent from '../components/post'
import Footer from '../components/footer'

class ViewPost extends Component<AppProps> {

    state = {
        _id: undefined,
        urlName: undefined,
        imageUrl: '',
        text: undefined,
        error: undefined,
        ready: false,
    }

    componentDidMount() {
        const urlName = this.props.match.params.urlname as string
        this.loadPost(urlName)
    }

    async loadPost(urlName) {
        try {
            const post = await api.postByUrlName(urlName)
            const ready = true
            this.setState({...post, ready, error: undefined})

            const title = post.text ? stripHtml(post.text.substring(0, 50)) + '... - motors' : SITE_NAME
            document.title = title

            this.injectPostHtml(post.text)
        } catch (err) {
            this.setState({error: err.error, ready: true})
        }
    }

    deletePost = async (id) => {
        const ok = await api.delete(id)
        ok && this.props.history.push('/')
    }

    injectPostHtml(text) {
        const div = document.getElementById('text')
        if (div) {
            div.innerHTML = text
        }
    }

    postUpdate(url) {
        this.props.history.replace(url)
        this.setState({ready: false}, () => this.loadPost(url))
    }

    render() {
        const auth = isAuthenticated()
        return this.state.ready ? (
            <div className="home">
                <div id="top-bar" className="top-bar">
                    <Menu gotoFunc={url => this.postUpdate(url)}/>
                    {auth && <Link className="create" to="/create" >create</Link>}
                    {auth ?
                        <Link className="auth" to="/logout" >logout</Link> :
                        <Link className="auth" to="/login" >login</Link>
                    }
                </div>
                <img className="logo" src={'/images/logo.png'} alt="" onClick={() => this.props.history.push('/')} />
                {this.state.error && <div className="error">{this.state.error}</div>}
                <div className="post-list">
                    <PostComponent post={this.state} deletePost={this.deletePost} strip={false} more={false}/>
                </div>
                <Footer homeFunc={() => this.props.history.push('/')}/>
            </div>
        ) : <Loading />
    }
}

export default ViewPost