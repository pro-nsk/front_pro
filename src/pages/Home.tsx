import * as React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import AppProps from '../util/AppProps';
import {Post, api} from '../api/api';
import {isAuthenticated} from '../util/AuthUtil';

const pageSize = 5;

class Posts extends Component<AppProps> {

    state = {
        posts: [],
        pageNumber: 0
    };

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        let posts = await api.posts();
        this.setState({posts});
    }

    renderFeed() {
        let posts: Post[] = this.state.posts;
        return posts.map(post => {
            return <div key={post._id}>
                <img key={post._id} src={post.url} />
                <div onClick={() => this.deletePost(post._id)}>delete</div>
            </div>;
        }).slice(this.state.pageNumber * pageSize,(this.state.pageNumber * pageSize) + pageSize);
    }

    next = () => {
        this.setState({pageNumber: this.state.pageNumber + 1});
        this.backToTop();
    }

    prev = () => {
        this.setState({pageNumber: this.state.pageNumber - 1});
        this.backToTop();
    }

    backToTop() {
        let navBar = document.getElementById('top-bar');
        navBar && navBar.scrollIntoView();
    }

    isFirst() {
        return this.state.pageNumber == 0;
    }

    isLast() {
        let gg = this.state.posts.length / pageSize;
        console.log(gg);
        return (this.state.posts.length / pageSize) <= (this.state.pageNumber + 1);
    }

    deletePost(id: string) {
        api.delete(id);
    }

    render() {
        const auth = isAuthenticated();
        return [
            <div key="top-bar" id="top-bar" className="top-bar">
                {auth && <Link className="create" to="/create" key="create">create</Link>}
                {auth ?
                    <Link className="auth" to="/logout" key="logout">logout</Link> :
                    <Link className="auth" to="/login" key="login">login</Link>
                }
            </div>,
            <div key="posts" className="post-list">
                {this.renderFeed()}
            </div>,
            <div key="pagination" className="bottom-bar">
                {!this.isFirst() && <div className="prev" onClick={this.prev}>prev</div>}
                {!this.isLast() && <div className="next" onClick={this.next}>next</div>}
            </div>
        ];
    }
}

export default Posts;