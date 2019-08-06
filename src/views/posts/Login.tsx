import * as React from 'react';
import { Component } from 'react';
import AppProps from '../../util/AppProps';
import { postApi } from '../../api/api';
import './style.css';
import {isEnter} from '../../util/AuthUtil';

class Login extends Component<AppProps> {

    state = {
        email: '',
        pass: '',
        error: undefined
    };

    login = () => {
            postApi.login(this.state.email, this.state.pass).then(success => {
                if (success) {
                    this.props.history.push('/');
                } else {
                    this.setState({unauthorized: true});
                }
            }).catch(error => {
                this.setState({error: error.error});
            });
        
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
                            <input onChange={this.handleEmailChange} onKeyPress={e => isEnter(e) && this.login()}/>
                            <input onChange={this.handlePassChange} onKeyPress={e => isEnter(e) && this.login()}/>
                
                <div className="pro-buttons">
                    <div className="form-b-1" onClick={this.props.history.goBack}>cancel</div>
                    <div className="form-b-2" onClick={this.login}>login</div>
                </div>
            
            </div>
            
        );
    }
}

export default Login;