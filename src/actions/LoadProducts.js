import axios from 'axios';

export const loadProducts = () => dispatch => {
    
    var postData = {
        email: "test@test.com",
        password: "password"
        };
        
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": "Bearer " + localStorage.getItem('token'),
            "Accept": "application/json"
        }
    };
    
    return axios.post('http://127.0.0.1:8000/api/products', postData, axiosConfig).then((response) => {
        dispatch({
            type: "SET_PRODUCTS",
            payload: response.data.products
        });
    }).catch((error) => {
        console.log(error)
    });
    
}
