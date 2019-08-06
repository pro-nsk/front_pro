import { Alert, Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';
import { Component } from 'react';
import AppProps from '../../util/AppProps';
import { postApi } from '../../api/api';
import './style.css';

const FormItem = Form.Item;

class PLoginForm extends Component<FormComponentProps & AppProps> {

    state = {
        error: undefined
    };

    login = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            postApi.login(values.email, values.password).then(success => {
                if (success) {
                    this.props.history.push('/');
                } else {
                    this.setState({unauthorized: true});
                }
            }).catch(error => {
                this.setState({error: error.error});
            });
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return [
            <Form key={3} onSubmit={this.login} className="login-form">
                {this.state.error && <Alert message={this.state.error} type="error" style={{marginBottom: '20px'}}/>}
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input your email address'}],
                    })(
                        
                            <Input id="emailInput"  size="large" type="text"
                                   placeholder=" "/>
                          
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your password'}],
                    })(
                        
                            <Input id="passwordInput" size="large" type="password"
                                   placeholder=" "/>
                        
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
                    </Button>
                </FormItem>
            </Form>
        ];
    }
}

const PLogin = Form.create()(PLoginForm);
export default PLogin;