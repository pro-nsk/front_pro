import 'antd/dist/antd.css';
import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import AppProps from './util/AppProps';
import NewPost from './views/posts/NewPost';
import Posts from './views/posts/Posts';
import PLogin from './views/posts/Login';

class App extends React.Component<AppProps, {}> {

    state = {
        user: {
            name: '',
            logo: ''
        },
        loggedInUser: false
    };

    firstLoadingDone = () => {
        this.setState({
            loggedInUser: true
        });
    }

    firstLoadingCancel = () => {
        this.setState({
            loggedInUser: false
        });
    }

    setUser = (name, logo) => {
        this.setState({
            user: {
                name: name,
                logo: logo
            }
        });
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route path="/create" component={NewPost} />
                    <Route path="/login" component={PLogin} />
                    <Route path="/" component={Posts} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    }
}

export default App;