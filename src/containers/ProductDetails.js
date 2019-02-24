import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadProducts} from '../actions/LoadProducts';
import axios from 'axios';
import { Card, Button, CardHeader, CardFooter, CardBody,CardTitle, CardText } from 'reactstrap';
import { Alert } from 'reactstrap';


class ProductDetails extends Component {

    constructor(props) {
        // console.log(this.props);
        super(props);
        console.log(this.props);
        this.state = {
            user_id: localStorage.getItem('user_id'),
            product_id: null,
            quantity: 1,
            carts: []
        }
        
    }

   
    handleChangeQuantity = (e) => {
        this.setState({
            quantity: e.target.value
        });
    }

    handleCart = (e) => {
        
        let data = {
            user_id: localStorage.getItem('user_id'),
            product_id: this.props.product.id,
            quantity: this.state.quantity
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Accept": "application/json"
            }
        };
        axios.post('http://127.0.0.1:8000/api/add/cart', data, axiosConfig).then((response) => {
            console.log(response.data);
            localStorage.setItem('carts', JSON.stringify(response.data.carts));
            this.setState({
                carts: JSON.parse(localStorage.getItem('carts'))
            });
            this.props.updateCarts(JSON.parse(localStorage.getItem('carts')));
            console.log("LOCAL:", localStorage.getItem('carts'));
            console.log("STATE->CARTS", this.state.carts);
        }).catch((error) => {
            console.log(error);
        })
    }

    
    handleDelete = (e) => {
        console.log(this.props.product.id);

        var data = {
            id: this.props.product.id
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Accept": "application/json"
            }
        };

        console.log(this.props);
        console.log(this.props.product);
        axios.post('http://127.0.0.1:8000/api/delete/product/'+this.props.product.id, data,  axiosConfig).then((response) => {
            console.log(response.data);
            loadProducts();
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    


    render() {
        if(!this.props.product) {
            return (
                <p></p>
            )
        } else {
            switch(localStorage.getItem('user_type')){
                case "admin":
                    return (
                        <div>
                            <Alert color="info">
                                <h4>Product Details</h4>
                            </Alert>
                            <Card>
                                <CardHeader>{this.props.product.name}</CardHeader>
                                <CardBody>
                                    <CardText>{this.props.product.description}</CardText>
                                    <Button outline color="danger" onClick={this.handleDelete}>Delete</Button>{' '}
                                </CardBody>
                                <CardFooter>{this.props.product.price}$</CardFooter>
                            </Card>
                        </div>
                    )
                case "buyer":
                    return (
                        <div>
                            <div className="row">
                                
                                <div className="col-md-6">
                                    <Alert color="info">
                                        <h4>Product Details</h4>
                                    </Alert>
                                    <Card>
                                        <CardHeader>{this.props.product.name}</CardHeader>
                                        <CardBody>
                                            <CardText>{this.props.product.description}</CardText>
                                            <Button outline color="primary" onClick={this.handleCart}>Add To Cart</Button>{' '}
                                            <br/>
                                            <label>Quantity</label>
                                            <br/>
                                            <input className="add-to-cart-quantity" type="number" value={this.state.quantity} onChange={this.handleChangeQuantity.bind(this)}/>
                                        </CardBody>
                                        <CardFooter>{this.props.product.price}$</CardFooter>
                                    </Card>
                                </div>
                            </div>    
                        </div>
                    )
                default:
                    return (
                        <h1>Invalid user</h1>
                    )
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        product: state.selectedProduct,
        products: state.loadProducts
    };
};


export default connect(mapStateToProps)(ProductDetails);