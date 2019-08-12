import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import AppProps from './util/appProps';
import CreatePost from './pages/createPost1';
import Posts from './pages/home1';
import Login from './pages/login';
import Logout from './pages/logout';
import Register from './pages/register';

class App extends React.Component<AppProps> {

    state = {
        user: {
            name: '',
            logo: ''
        },
        loggedInUser: false
    };

    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route path="/create" component={CreatePost} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/register" component={Register} />
                    <Route path="/" component={Posts} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    }
}

export default App;