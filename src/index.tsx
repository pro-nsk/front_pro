import * as React              from 'react'
import * as ReactDOM           from 'react-dom'
import * as serviceWorker      from './serviceWorker'
import App                     from './app'
import {Route, Router, Switch} from 'react-router'
import {createBrowserHistory}  from 'history'
import './index.css'

let html = (
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route path="/" component={App}/>
        </Switch>
    </Router>
)

ReactDOM.render(html, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()