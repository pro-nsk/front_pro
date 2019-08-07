import * as React from 'react';
import {Component} from 'react';
import {api} from '../../api/api';
import AppProps from '../../util/AppProps';
import {isEnter} from '../../util/AuthUtil';
import './style.css';

class Login extends Component<AppProps> {

    state = {
        email: '',
        pass: '',
        error: undefined
    };

    login = async () => {
        try {
            let success = await api.login(this.state.email, this.state.pass);
            if (success) {
                this.props.history.push('/');
            }
        } catch (error) {
            this.setState({error: error.error});
        }
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePassChange = (e) => {
        this.setState({pass: e.target.value});
    }

    render() {
        return (
            <div className="pro-form">
                {this.state.error && <div className="error">{this.state.error}</div>}
                <input type="email" onChange={this.handleEmailChange} onKeyPress={e => isEnter(e) && this.login()} />
                <input type="password" onChange={this.handlePassChange} onKeyPress={e => isEnter(e) && this.login()} />
                <div className="pro-buttons">
                    <div className="form-b-1" onClick={this.props.history.goBack}>cancel</div>
                    <div className="form-b-2" onClick={this.login}>login</div>
                </div>
            </div>
        );
    }
}

export default Login;