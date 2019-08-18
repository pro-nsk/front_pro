import * as React from 'react'
import {Component} from 'react'
import AppProps from '../util/appProps'
import {Post, api} from '../api/api'
import './style.css'
import {isEnter} from '../util/util'

class CreatePost extends Component<AppProps> {

    state = {
        urlName: undefined,
        imageUrl: '',
        text: undefined,
        error: undefined
    }

    create = async () => {
        let post: Post = {
            imageUrl: this.state.imageUrl,
            urlName: this.state.urlName,
            text: this.state.text
        }
        try {
            let posts = await api.create(post)
            if (posts) {
                this.props.history.push('/')
            }
        } catch (err) {
            this.setState({error: err.error})
        }
    }

    handleUrlChange = (e) => {
        this.setState({imageUrl: e.target.value})
    }

    handleUrlNameChange = (e) => {
        this.setState({urlName: e.target.value})
    }

    handleTextChange = (e) => {
        this.setState({text: e.target.value})
    }

    render() {
        return (
            <div className="pro-form">
                {this.state.error && <div className="error">{this.state.error}</div>}
                <input onChange={this.handleUrlNameChange} onKeyPress={e => isEnter(e) && this.create()} />
                <input onChange={this.handleUrlChange} onKeyPress={e => isEnter(e) && this.create()} />
                <textarea onChange={this.handleTextChange} />
                <div className="pro-buttons">
                    <div className="form-b-1" onClick={this.props.history.goBack}>cancel</div>
                    <div className="form-b-2" onClick={this.create}>create post</div>
                </div>
            </div>
        )
    }
}

export default CreatePost