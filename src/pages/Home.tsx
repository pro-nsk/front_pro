import * as React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import AppProps from '../util/AppProps';
import {Post, api} from '../api/api';
import {isAuthenticated} from '../util/AuthUtil';

class Posts extends Component<AppProps> {

    state = {
        posts: []
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
        return posts.map(post => <img key="s" src={post.url} />);
        // .slice(6,10)
    }

    render() {
        const auth = isAuthenticated();
        return [
            <div key="nav-bar" className="nav-bar">
                {auth && <Link className="pro-menu" to="/create" key="create">create</Link>}
                {auth ?
                    <Link className="pro-menu" to="/logout" key="logout">logout</Link> :
                    <Link className="pro-menu" to="/login" key="login">login</Link>
                }
            </div>,
            <div key="posts" className="post-list">
                {this.renderFeed()}
            </div>
        ];
    }
}

export default Posts;