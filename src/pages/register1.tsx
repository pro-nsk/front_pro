import * as React from 'react';
import {Component} from 'react';
import {api} from '../api/api';
import AppProps from '../util/appProps';
import {isEnter} from '../util/util';
import './style.css';

class Register extends Component<AppProps> {

    state = {
        email: '',
        pass: '',
        passConfirm: '',
        error: undefined
    };

    register = async () => {
        try {
            let success = await api.register(this.state.email, this.state.pass, this.state.passConfirm);
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

    handleConfirmChange = (e) => {
        this.setState({passConfirm: e.target.value});
    }

    render() {
        return (
            <div className="pro-form">
                {this.state.error && <div className="error">{this.state.error}</div>}
                <input type="email" onChange={this.handleEmailChange} onKeyPress={e => isEnter(e) && this.register()} />
                <input type="password" onChange={this.handlePassChange} onKeyPress={e => isEnter(e) && this.register()} />
                <input type="password" onChange={this.handleConfirmChange} onKeyPress={e => isEnter(e) && this.register()} />
                <div className="pro-buttons">
                    <div className="form-b-1" onClick={this.props.history.goBack}>cancel</div>
                    <div className="form-b-2" onClick={this.register}>register</div>
                </div>
            </div>
        );
    }
}

export default Register;