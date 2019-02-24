import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router ,Redirect, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import Route from 'react-router-dom/Route';
import Product from '../Dashboard/Product';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            token: null
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
        // this.props.history.push("/dashboard/products");
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post('http://127.0.0.1:8000/api/login', data).then(response => {
            console.log(response.data.success.token);
            this.setState({
                token: response.data.success.token
            });
            localStorage.setItem('user_id', response.data.success.user.id);
            localStorage.setItem('token', response.data.success.token);
            localStorage.setItem('user_type', response.data.success.user.type);
            this.props.history.push("/dashboard/products");
        }).catch(error => console.log(error));
    }

    render() {

        return (
            <div>
            <div className="App-header">
                <h1><code>Reactive|E-shop</code></h1>
                <Button outline color="info"><Link to="/">Home</Link></Button>
                <br/>
                <hr/>
            </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="address@domain.com" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="**********" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
                            </FormGroup>
                            <Button type="submit" outline color="success">Login</Button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}

export default Login;