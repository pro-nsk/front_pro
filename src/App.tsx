import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import AppProps from './util/AppProps';
import NewPost from './views/posts/NewPost';
import Posts from './views/posts/Home';
import Login from './views/posts/Login';
import Logout from './views/posts/Logout';

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
                    <Route path="/create" component={NewPost} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" component={Posts} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    }
}

export default App;