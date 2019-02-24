import React, {Component} from 'react';
import ProductList from '../../containers/ProductList';
import ProductDetails from '../../containers/ProductDetails';
import {connect} from 'react-redux'
import {loadProducts} from '../../actions/LoadProducts';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { Alert } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Product extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            category_id: 2,
            description: '',
            price: '',
            quantity: 1,
            carts: localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []
        }

        if(!localStorage.getItem('token')) {
            this.props.history.push("/login");
        } else {
            console.log('logged in');
        }

        console.log(this.state);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    updateState(carts) {
        this.setState({
            carts
        });
    }
    componentDidMount() {
        console.log(this.state.carts);
        if(localStorage.getItem('token') === null) {
            this.props.history.push("/login");
        } else {
            console.log('logged in');
            this.props.loadProducts();
            console.log(localStorage.getItem('user_id'), localStorage.getItem('token'));
        }
        
    }

    handleChangeName(e) {
        this.setState({
            name: e.target.value
        });
        console.log(this.state);
    }

    handleChangeCategory(e) {
        this.setState({
            category_id: e.target.value
        });
        console.log(this.state);
    }

    handleChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    handleChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        var data = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            quantity: this.state.quantity,
            category_id: this.state.category_id
        }

        // console.log("PostData: ", postData);
            
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Accept": "application/json"
            }
        };

        axios.post('http://127.0.0.1:8000/api/store/product', data, axiosConfig).then((response) => {
            this.props.loadProducts();
            console.log(response.data);
            this.setState({
                name: '',
                category_id: 2,
                description: '',
                price: '',
                quantity: 1
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    handleOrder = (e) => {
        console.log("order");
        var data = {
            user_id: localStorage.getItem('user_id')
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Accept": "application/json"
            }
        };
        axios.post('http://127.0.0.1:8000/api/place-order', data, axiosConfig).then((response) => {
            console.log('order placed', response.data);
            localStorage.removeItem('carts');
        }).catch((error) => {
            console.log(error);
        });
    } 

    handleLogout = (e) => {
        localStorage.setItem('user_id', null);
        localStorage.setItem('token', null);
        localStorage.setItem('user_type', null);
        this.props.history.push("/login");
    }

    cartDetails = () => {
        console.log("**********", this.state.carts);
        if(JSON.parse(localStorage.getItem('carts')) === null) {
            return "";
        } else {
            return (
                <div>
                    
                    {JSON.parse(localStorage.getItem('carts')).map((cart) => {
                        return (
                            <div>
                                <hr/>
                                <p key="cart.id">
                                    Name: {cart.product.name}
                                    <br/>
                                    Quantity: {cart.quantity}
                                    <br/>
                                    Total Price: {cart.total_price}
                                </p>
                                <hr/>
                            </div>
                        );
                    })}
                    <Button outline color="success" onClick={this.handleOrder}>Order</Button>
                </div>
            );
        }
    }

    render() {
        switch(localStorage.getItem('user_type')) {
            
            case "admin":
                return (
                    <div>
                        <div className="App-header">
                            <h1><code>Reactive|E-shop</code></h1>
                            <Button outline color="info" onClick={this.handleLogout}>Log out</Button>
                            <br/>
                            <hr/>
                        </div>
                        <div>
                            <Alert color="info">
                                <h4>Add Product</h4>
                            </Alert>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Label for="name">Name</Label>
                                                <Input type="text" name="name" id="name" placeholder="Product name" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <Label for="price">Price</Label>
                                                        <Input type="number" name="price" id="price" placeholder="" value={this.state.price} onChange={this.handleChangePrice.bind(this)}/>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Label for="quantity">Quantity</Label>
                                                        <Input type="number" name="quantity" id="quantity" placeholder="" value={this.state.quantity} onChange={this.handleChangeQuantity.bind(this)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <Label for="description">Description</Label>
                                                <Input type="textarea" name="description" id="description" placeholder="Product description" value={this.state.description} onChange={this.handleChangeDescription.bind(this)}/>
                                            </div>
                                        </div>
                                        <Button type="submit" outline color="success">Submit</Button>
                                    </FormGroup>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Alert color="info">
                                    <h4>Products</h4>
                                </Alert>
                                <ProductList />
                            </div>
                            <div className="col-md-8">
                                <ProductDetails />
                            </div>
                        </div>
                    </div>
                );
            
            case "buyer":
                return (
                    <div>
                        <div className="App-header">
                            <h1><code>Reactive|E-shop</code></h1>
                            <Button outline color="info" onClick={this.handleLogout}>Log out</Button>
                            <br/>
                            <hr/>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Alert color="info">
                                            <h4>Products</h4>
                                        </Alert>
                                        <ProductList />
                                    </div>
                                    <div className="col-md-6">  
                                        <ProductDetails updateCarts={this.updateState} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <Alert color="primary">
                                    <h4>Cart Details</h4>
                                </Alert>
                                <div>
                                    { this.cartDetails() }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                )
            
            default:
                return (
                    <h6>Type didn't match</h6>
                )
        }
        
    }
}

const mapStateToProps = state => ({
    products: state.products.products
});
export default connect(mapStateToProps, {loadProducts})(Product);