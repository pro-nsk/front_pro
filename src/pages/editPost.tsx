import * as React from 'react'
import {Component} from 'react'
import AppProps from '../util/appProps'
import {Post, api} from '../api/api'
import './style.css'
import {isEnter} from '../util/util'

class EditPost extends Component<AppProps> {

    state = {
        urlName: undefined,
        imageUrl: '',
        text: undefined,
        error: undefined
    }

    componentDidMount() {
        const id = this.props.match.params.id as string
        this.loadPost(id)
    }

    async loadPost(id) {
        let post = await api.post(id)
        this.setState({...post})
    }

    edit = async () => {
        const id = this.props.match.params.id as string
        let post: Post = {
            imageUrl: this.state.imageUrl,
            urlName: this.state.urlName,
            text: this.state.text
        }
        try {
            let ok = await api.edit(id, post)
            if (ok) {
                this.props.history.goBack()
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
                <input value={this.state.urlName} onChange={this.handleUrlNameChange} onKeyPress={e => isEnter(e) && this.edit()} />
                <input value={this.state.imageUrl} onChange={this.handleUrlChange} onKeyPress={e => isEnter(e) && this.edit()} />
                <textarea value={this.state.text} onChange={this.handleTextChange} />
                <div className="pro-buttons">
                    <div className="form-b-1" onClick={this.props.history.goBack}>cancel</div>
                    <div className="form-b-2" onClick={this.edit}>edit post</div>
                </div>
            </div>
        )
    }
}

export default EditPost