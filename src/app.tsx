import * as React from 'react'
import { Redirect, Route, Router, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import Footer from './components/footer'
import Menu from './components/menu'
import CreatePost from './pages/createPost'
import EditPost from './pages/editPost'
import Home from './pages/home'
import Login from './pages/login'
import Logout from './pages/logout'
import Register from './pages/register'
import ViewPost from './pages/viewPost'
import AppProps from './util/appProps'
import { backToTop, isAuthenticated } from './util/util'

const App = (props: AppProps) => {
    const auth = isAuthenticated()
    return (
        <Router history={props.history}>
            <div className="home">
                <div id="top-bar" className="top-bar">
                    <Menu gotoFunc={url => props.history.push(url)} />
                    {auth && <Link className="create" to="/create" >create</Link>}
                    {auth ?
                        <Link className="auth" to="/logout" >logout</Link> :
                        <Link className="auth" to="/login" >login</Link>
                    }
                </div>
                <img className="logo" src={'/images/logo.png'} alt="" /*onClick={() => this.loadPage(0)}*/ />
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
                <Footer homeFunc={backToTop} />
            </div>
        </Router>
    )
}

export default App