import * as React from 'react';
import {Component} from 'react';
import AppProps from '../../util/AppProps';
import {Post, api} from '../../api/api';
import './style.css';
import {isEnter} from '../../util/AuthUtil';

class NewPost extends Component<AppProps> {

    state = {
        url: '',
        error: undefined
    };

    create = async () => {
        let post: Post = {url: this.state.url};
        try {
            let posts = await api.create(post);
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

    render() {
        return (
            <div className="pro-form">
                {this.state.error && <div className="error">{this.state.error}</div>}
                <input onChange={this.handleUrlChange} onKeyPress={e => isEnter(e) && this.create()}/>
                <div className="pro-buttons">
                    <div className="form-b-1" onClick={this.props.history.goBack}>cancel</div>
                    <div className="form-b-2" onClick={this.create}>create post</div>
                </div>
            </div>
        );
    }
}

export default NewPost;