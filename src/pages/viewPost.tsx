import * as React from 'react'
import {Component} from 'react'
import AppProps from '../util/appProps'
import {api} from '../api/api'
import './style.css'
import {isAuthenticated, SITE_NAME, stripHtml} from '../util/util'
import {Link} from 'react-router-dom'
import Loading from './loading'
import Menu from '../components/menu'

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
            let post = await api.postByUrlName(urlName)
            let ready = true
            this.setState({...post, ready})

            let title = post.text ? stripHtml(post.text.substring(0, 50)) + '... - motors' : SITE_NAME
            document.title = title

            this.injectPostHtml(post.text)
        } catch (err) {
            this.setState({error: err.error, ready: true})
        }
    }

    async deletePost(id) {
        let ok = await api.delete(id)
        ok && this.props.history.push('/')
    }

    injectPostHtml(text) {
        let div = document.getElementById('text')
        if (div) {
            div.innerHTML = text
        }
    }

    postUpdate(url) {
        this.props.history.replace(url)
        this.loadPost(url)
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
                    <div className="post">
                        <a href={this.state.imageUrl}><img src={this.state.imageUrl} /></a>
                        {this.state.text && <div id="text" className="text"></div>}
                        <div className="control">
                            {auth && <div className="delete" onClick={() => this.deletePost(this.state._id)}>delete</div>}
                            {auth && <Link className="edit" to={`/edit/${this.state._id}`} >edit</Link>}
                        </div>
                    </div>
                </div>
                <div className="copyright">© <div onClick={() => this.props.history.push('/')} ><img id="copyright-logo" src={'/images/logo.png'} alt=""/>pro nsk</div>, 2011. Материалы сайта защищены авторским правом. При копировании обратная ссылка обязательна.</div>
                <a className="twitter" href="https://twitter.com/pro_nsk"><img src={'/images/twitter.svg'} alt="" /></a>
            </div>
        ) : <Loading />
    }
}

export default ViewPost