import * as React from 'react'
import { Redirect, Route, Router, Switch } from 'react-router'
import AppProps from './util/appProps'
import CreatePost from './pages/createPost'
import Posts from './pages/home'
import Login from './pages/login'
import Logout from './pages/logout'
import Register from './pages/register'

class App extends React.Component<AppProps> {

    state = {
        user: {
            name: '',
            logo: ''
        },
        loggedInUser: false
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    {/* special routes */}
                    <Route path='/post/:id' component={id => { 
                        window.location.href = 'https://example.com/' + id
                        return null
                    }}/>
                    {/* special routes */}
                    <Route path="/create" component={CreatePost} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/register" component={Register} />
                    <Route path="/" component={Posts} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        )
    }
}

export default App