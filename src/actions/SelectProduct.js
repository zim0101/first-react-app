export const selectProduct = (product) => {
    console.log('View product : ', product.name);
    return {
        type: "SELECT_PRODUCT",
        payload: product
    };
};