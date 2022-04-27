import React from 'react'
// import Customer from './pages/customer'
import Login from './pages/login'
import Product from './pages/product'
import Cart from './pages/cart'
import Transaction from './pages/transaction'
import Profile from './pages/profile'
// import Admin from './pages/admin'
import { Route, Switch } from 'react-router-dom'

export default class Main extends React.Component {
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Product} />
                <Route path="/login" component={Login} />
                <Route path="/cart" component={Cart} />
                <Route path="/transaction" component={Transaction} />
                <Route path="/profile" component={Profile} />
            </Switch>
        )
    }
}