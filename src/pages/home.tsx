import * as React from 'react'
import { Component } from 'react'
import { api, Post } from '../api/api'
import PostComponent from '../components/post'
import AppProps from '../util/appProps'
import { backToTop, SITE_NAME } from '../util/util'
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
        const posts = await api.home(this.state.pageNumber)
        const ready = true
        this.setState({ posts, ready })
    }

    renderFeed() {
        const posts: Post[] = this.state.posts
        return posts.map(post => <PostComponent key={post._id} post={post} deletePost={this.deletePost} strip more />)
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
        this.setState({ pageNumber, ready: false }, () => this.loadData())
    }

    deletePost = async (id) => {
        const ok = await api.delete(id)
        ok && this.loadData()
    }

    render() {
        return this.state.ready ? (
            <div>
                <div className="post-grid">
                    {this.renderFeed()}
                </div>
                <div className="bottom-bar">
                    {!this.isFirst() && <div className="prev" onClick={this.prev}>prev</div>}
                    {!this.isLast() && <div className="next" onClick={this.next}>next</div>}
                </div>
            </div>
        ) : <Loading />
    }
}

export default Posts