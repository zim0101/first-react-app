import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Link , withRouter, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Nav from './components/Home/Nav';
import Footer from './components/Home/Footer';
import Routes from './Routes';
import Product from './components/Dashboard/Product';
import Login from './components/Auth/Login';
class App extends Component {
  render() {
    return (
      <Routes />
    );
  }
}

export default App;
