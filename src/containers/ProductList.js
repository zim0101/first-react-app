import React , { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {selectProduct} from '../actions/SelectProduct';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';


class ProductList extends Component {
    createListItem() {
        return this.props.products.map((product) => {
            return (
                <ListGroupItem className="justify-content-between" key={product.id} onClick = {() => this.props.selectProduct(product)}> 
                    {product.name} <Badge pill>{product.quantity}</Badge>
                </ListGroupItem>
            );
        });
    };

    render() {
        return (
            <div>
                <ListGroup>
                    {this.createListItem()}
                </ListGroup>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products.products
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectProduct: selectProduct}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ProductList);