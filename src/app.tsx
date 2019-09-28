import * as React from 'react'
import { Redirect, Route, Router, Switch } from 'react-router'
import AppProps from './util/appProps'
import CreatePost from './pages/createPost'
import Home from './pages/home'
import Login from './pages/login'
import Logout from './pages/logout'
import Register from './pages/register'
import EditPost from './pages/editPost'
import ViewPost from './pages/viewPost'

class App extends React.Component<AppProps> {
    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route path="/create" component={CreatePost} />
                    <Route path="/edit/:id" component={EditPost} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/register" component={Register} />
                    <Route path="/:urlname" component={ViewPost} />
                    <Route path="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        )
    }
}

export default App