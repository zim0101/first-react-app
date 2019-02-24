import React, {Component} from 'react';
import { BrowserRouter as Router , Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from '../Auth/Login';
import Nav from './Nav';
import Footer from './Footer';


class Home extends Component {
    render() {
        return (
            <div>
                <Nav />
                <Footer />
            </div>
        )
    }
}

export default Home;