import {combineReducers} from 'redux';
import ProductReducer from './ProductReducer';
import ViewProductReducer from './ViewProductReducer';

const rootReducer = combineReducers({
    products: ProductReducer,
    selectedProduct: ViewProductReducer
});

export default rootReducer;