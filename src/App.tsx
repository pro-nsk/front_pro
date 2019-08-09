import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import AppProps from './util/AppProps';
import CreatePost from './pages/CreatePost';
import Posts from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';

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