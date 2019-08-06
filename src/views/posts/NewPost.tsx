import * as React from 'react';
import {Component} from 'react';
import AppProps from '../../util/AppProps';
import {Post, postApi} from '../../api/api';
import './style.css';

class NewPost extends Component<AppProps> {

    state = {
        url: '',
        error: undefined
    };

    create = async () => {
        let post: Post = {url: this.state.url};
        try {
            let posts = await postApi.create(post);
            if (posts) {
                this.props.history.push('/');
            }
        } catch (err) {
            this.setState({error: err.error});
        }
    }

    handleUrlChange = (e) => {
        this.setState({url: e.target.value});
    }

    handlleEnter = (e) => {
        if (e.key == 'Enter') {
            this.create();
        }
    }

    render() {
        return (
            <div className="create-post-form">
                {this.state.error && <div className="error">{this.state.error}</div>}
                <input onChange={this.handleUrlChange} onKeyPress={this.handlleEnter}/>
                <div className="create-post-buttons">
                    <div className="create-post-b-1" onClick={this.props.history.goBack}>cancel</div>
                    <div className="create-post-b-2" onClick={this.create}>create post</div>
                </div>
            </div>
        );
    }
}

export default NewPost;