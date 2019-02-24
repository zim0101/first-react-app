import React, {Component} from 'react';
import { BrowserRouter as Router , Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from '../Auth/Login';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button } from 'reactstrap';
import logo from '../../../src/logo.svg';
import '../../../src/App.css';

class AppNav extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <div className="row">
                        <div className="col-md-6">
                            <Link className="App-link" to="/login">Login</Link>
                        </div>
                        <div className="col-md-6">
                            <Link className="App-link" to="/register">Register</Link>
                        </div>
                    </div>
                </Navbar>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Buy from our <code>Reactive|E-shop</code> and save money.
                    </p>
                    
                    <a
                        className="App-link"
                        rel="noopener noreferrer"
                    >
                        Lets gooo!
                    </a>
                </header>
            </div>
        )
    }
}

export default AppNav;