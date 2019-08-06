import { Card, List } from 'antd';
import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import AppProps from '../../util/AppProps';
import { Post, postApi } from '../../api/api';

class BundleList extends List<Post> {
}

class Posts extends Component<AppProps> {

    state = {
        posts: []
    };

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        let posts = await postApi.posts();
        this.setState({ posts });
    }

    render() {
        return [
            <div key="nav-bar" className="nav-bar">
                <Link
                    className="pro-menu"
                    to="/create"
                    key="create">
                    create
                </Link>
                <Link
                    className="pro-menu"
                    to="/login"
                    key="login">
                    login
                </Link>
            </div>,
            <BundleList
                key="posts"
                className="post-list"
                grid={{ gutter: 16, column: 1 }}
                dataSource={this.state.posts}
                renderItem={item => (
                    <List.Item>
                        <Card
                            className="bundle-list-item"
                            cover={<img alt="example" src={item.url} />}
                        />
                    </List.Item>
                )}
            />
        ];
    }
}

export default Posts;