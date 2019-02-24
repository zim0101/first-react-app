// import React from "react";
import React, {Component} from 'react';
// import { Route, Switch, withRouter } from "react-router-dom";
import { BrowserRouter as Router , Link , withRouter, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import {connect} from 'react-redux';
import Product from "./components/Dashboard/Product";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';

class Routes extends Component {
  render() {
    return (
        <Router>
          <Switch>
              <Route path="/dashboard/products" exact strict component={withRouter(Product)} />
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route path='/' exact component={Home} />
            </Switch>
        </Router>
      
    )
  }
}

export default Routes;
// export default withRouter(connect(mapStateToProps, {})(Routes));
// export default withRouter(connect(mapStateToProps)(Routes));
// export default () =>
//   <Switch>
//     <Route path="/dashboard/products" component={Product} />
//   </Switch>;